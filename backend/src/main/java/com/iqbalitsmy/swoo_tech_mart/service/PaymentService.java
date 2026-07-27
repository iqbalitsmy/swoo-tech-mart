package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.PaymentInitiationResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PaymentStatusResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.OrderRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.PaymentRepository;
import com.iqbalitsmy.swoo_tech_mart.service.payment.PaymentGatewayClient;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PaymentGatewayClient gatewayClient;

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
        Payment payment = Payment.builder()
                .order(order)
                .provider(order.getPaymentProvider())
                .status(PaymentStatus.PENDING)
                .amount(order.getTotalAmount())
                .build();

        Payment saved =  paymentRepository.save(payment);

        var result = gatewayClient.initiate(saved);
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
    public void handleWebhook(String rawBody, String signatureHeader) {
        if (!gatewayClient.verifyWebhookSignature(rawBody, signatureHeader)) {
            throw new AccessDeniedException("Invalid webhook signature");
        }

        var event = gatewayClient.parseWebhookEvent(rawBody);

        Payment payment = paymentRepository.findByProviderReference(event.providerReference())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No payment found for reference: " + event.providerReference()));

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
            // Order stays PENDING — the customer can retry via POST /api/payments/{orderId}/initiate.
        }

        paymentRepository.save(payment);
    }

}
