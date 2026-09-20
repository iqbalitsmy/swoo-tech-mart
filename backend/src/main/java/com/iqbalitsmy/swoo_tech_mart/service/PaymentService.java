package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.PaymentInitiationResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PaymentStatusResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.OrderRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.PaymentRepository;
import com.iqbalitsmy.swoo_tech_mart.service.payment.PaymentGatewayClient;
import com.iqbalitsmy.swoo_tech_mart.service.payment.PaymentGatewayClientResolver;
import jdk.jfr.EventType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PaymentGatewayClientResolver gatewayClientResolver;

    @Value("${app.payments.currency:usd}")
    private String defaultCurrency;

    @Transactional
    public PaymentInitiationResponse initiate(Long orderId, Long userId){
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("This order is not awaiting payment (status: " + order.getStatus() + ")");
        }

        return initiateForOrder(order);
    }

    @Transactional
    public PaymentInitiationResponse initiateForOrder(Order order){
        Optional<Payment> existing = paymentRepository.findTopByOrder_IdOrderByCreatedAtDesc(order.getId());
        PaymentGatewayClient client = gatewayClientResolver.resolve(order.getPaymentProvider());


        if (existing.isPresent() && existing.get().getStatus() == PaymentStatus.PENDING) {
            Payment reused = existing.get();
            // Nothing sensitive was persisted — re-fetch a fresh client secret
            // for the SAME PaymentIntent instead of creating a new one.
            var result = client.retrieve(reused.getProviderReference());
//            log.debug("Reusing existing PENDING payment {} for order {} — re-fetched client secret, no new PaymentIntent", reused.getId(), order.getId());
            return PaymentInitiationResponse.of(reused, result.clientSecret(), result.redirectUrl());
        }

        Payment payment = Payment.builder()
                .order(order)
                .provider(order.getPaymentProvider())
                .status(PaymentStatus.PENDING)
                .amount(order.getTotalAmount())
                .currency(defaultCurrency)
                .build();

        Payment saved =  paymentRepository.save(payment);

//        PaymentGatewayClient client = gatewayClientResolver.resolve(order.getPaymentProvider());
        var result = client.initiate(saved);
        saved.setProviderReference(result.providerReference());
        paymentRepository.save(saved);

        return PaymentInitiationResponse.of(saved, result.clientSecret(), result.redirectUrl());
    }

    @Transactional(readOnly = true)
    public PaymentStatusResponse getStatus(Long orderId, Long userId){
        if (orderRepository.findByIdAndUserId(orderId, userId).isEmpty()) {
            throw new ResourceNotFoundException("Order not found with id: " + orderId);
        }

        Payment payment = paymentRepository.findTopByOrder_IdOrderByCreatedAtDesc(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("No payment attempt found for order " + orderId));

        return PaymentStatusResponse.fromEntity(payment);
    }

    @Transactional
    public void handleWebhook(PaymentProvider provider, String rawBody, String signatureHeader) {
        PaymentGatewayClient client = gatewayClientResolver.resolve(provider);
        var result = client.verifyAndParseWebhook(rawBody, signatureHeader);
        switch (result.status()){
            case INVALID_SIGNATURE -> throw new AccessDeniedException("Invalid webhook signature");
            case IGNORED -> {

            }
            case VERIFIED -> applyWebhookEvent(result.event());
        }
    }

    private void applyWebhookEvent(PaymentGatewayClient.GatewayWebhookEvent event){
        Payment payment = paymentRepository.findByProviderReference(event.providerReference())
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with provider: " + event.providerReference()));

        if (event.succeeded()) {
            payment.setStatus(PaymentStatus.SUCCEEDED);
            payment.setPaidAt(Instant.now());
            payment.setFailureReason(null);

            Order order = payment.getOrder();
            if (order.getStatus() == OrderStatus.PENDING) {
                order.setStatus(OrderStatus.CONFIRMED);
                orderRepository.save(order);
            }
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            payment.setFailureReason(event.failureReason());
        }

        paymentRepository.save(payment);
    }

}
