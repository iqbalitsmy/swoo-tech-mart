package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CheckoutRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.*;
import com.iqbalitsmy.swoo_tech_mart.entity.*;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final AddressRepository addressRepository;
    private final ProductVariantRepository productVariantRepository;
    private final PaymentRepository paymentRepository;

    private final PaymentService paymentService;

    private final ShippingFeeCalculator  shippingFeeCalculator;


    @Transactional
    public CheckoutResponse checkout(Long userId, CheckoutRequest request){
        //Get the user's cart
        Cart cart = cartRepository.findByUser_Id(userId).orElseThrow(()->new BadRequestException("Your cart is empty"));

        //Retrieve all items from the cart.
        List<CartItem> cartItems = cartItemRepository.findByCart_IdOrderByAddedAtAsc(cart.getId());

        //Retrieve all items from the cart.
        if (cartItems.isEmpty()){
            throw new BadRequestException("Your cart is empty");
        }

        //Verify the selected shipping address belongs
        Address address = addressRepository.findByIdAndUser_Id(request.shippingAddressId(), userId)
                .orElseThrow(()->new BadRequestException("Address not found with id: "+request.shippingAddressId()));

        //Validate stock availability.
        for (CartItem cartItem : cartItems) {
            ProductVariant variant = cartItem.getProductVariant();

            if (!variant.getActive() || variant.getStockQty() < cartItem.getQuantity()){
                throw new BadRequestException("\"" + variant.getProduct().getTitle()+ "\"("+variant.getSku()+") no longer has enough stock");
            }
        }

        //Calculate subtotal.
        BigDecimal subtotal = cartItems.stream()
                .map(item -> item.getProductVariant().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        //Calculate shipping fee.
        BigDecimal shippingFee = shippingFeeCalculator.calculate(subtotal);
        //Calculate final payable amount.
        BigDecimal totalAmount = subtotal.add(shippingFee);

        //Create and save the Order.
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .userId(userId)
                .status(OrderStatus.PENDING)
                .shippingAddressId(address.getId())
                .shippingRecipientName(address.getRecipientName())
                .shippingLine1(address.getLine1())
                .shippingLine2(address.getLine2())
                .shippingCity(address.getCity())
                .shippingState(address.getState())
                .shippingPostalCode(address.getPostalCode())
                .paymentProvider(request.paymentProvider())
                .subTotal(subtotal)
                .shippingFee(shippingFee)
                .totalAmount(totalAmount)
                .build();

        Order savedOrder = orderRepository.save(order);

        //Create an OrderItem for every cart item.
        for (CartItem cartItem : cartItems) {
            ProductVariant variant = cartItem.getProductVariant();

            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .productVariant(variant)
                    .productTitleSnapshot(variant.getProduct().getTitle())
                    .skuSnapshot(variant.getSku())
                    .quantity(cartItem.getQuantity())
                    .unitPrice(variant.getPrice())
                    .build();

            orderItemRepository.save(orderItem);

            // Reduce inventory
            variant.setStockQty(variant.getStockQty() - cartItem.getQuantity());
            productVariantRepository.save(variant);
        }

        //Empty the user's cart.
        cartItemRepository.deleteByCart_Id(cart.getId());

        //Create a payment record and initialize the
        PaymentInitiationResponse payment = paymentService.initiateForOrder(savedOrder);

        return new CheckoutResponse(toDetailsResponse(savedOrder), payment);
    }

    @Transactional(readOnly = true)
    public PageResponse<OrderSummaryResponse> listForUser(Long userId, int page, int size, OrderStatus status){
        Specification<Order> spec = Specification
                .where(OrderSpecifications.userId(userId));

        if (status != null){
            spec = spec.and(OrderSpecifications.status(status));
        }

        Pageable pageable = PageRequest.of(Math.max(page, 0), clampSize(size), Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Order> result = orderRepository.findAll(spec, pageable); 

        Map<Long, Integer> itemCounts = itemCountsFor(result.getContent().stream().map(Order::getId).toList());

        return PageResponse.from(result.map(o -> OrderSummaryResponse.fromEntity(o, itemCounts.getOrDefault(o.getId(), 0))));
    }

    @Transactional(readOnly = true)
    public OrderDetailsResponse getById(Long orderId, Long userId, boolean isAdmin){
        Order order = isAdmin ? orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId))
                : orderRepository.findByIdAndUserId(orderId, userId).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: "+orderId));

                return toDetailsResponse(order);
    }

    @Transactional
    public OrderDetailsResponse cancel(Long orderId, Long userId){
        Order order = orderRepository.findByIdAndUserId(orderId, userId).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: "+orderId));

        if (order.getStatus() != OrderStatus.PENDING){
            throw new BadRequestException("Only pending orders can be cancelled (current status: "+order.getStatus()+")");
        }

        restock(order);

        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);

        return toDetailsResponse(order);
    }


    //------helpers------

    void restock(Order order){
        for (OrderItem item : orderItemRepository.findByOrder_Id(order.getId())){
            ProductVariant variant = item.getProductVariant();
            variant.setStockQty(variant.getStockQty() + item.getQuantity());
            productVariantRepository.save(variant);
        }
    }


    public OrderDetailsResponse toDetailsResponse(Order order){
        List<OrderItemResponse> items = orderItemRepository.findByOrder_Id(order.getId()).stream()
                .map(OrderItemResponse::fromEntity)
                .toList();

        var latestPayment = paymentRepository.findTopByOrder_IdOrderByCreatedAtDesc(order.getId()).orElse(null);
        var latestPaymentStatus = latestPayment != null ? latestPayment.getStatus() : null;


        return OrderDetailsResponse.fromEntity(order, items, latestPaymentStatus);
    }

    private Map<Long, Integer> itemCountsFor(List<Long> orderIds){
        if (orderIds.isEmpty()) return Map.of();

        Map<Long, Integer> counts = new HashMap<>();
        for (OrderItem item : orderItemRepository.findByOrder_IdIn(orderIds)) {
            counts.merge(item.getId(), 1, Integer::sum);
        }
        return counts;
    }


    private String generateOrderNumber(){
        String candidate;

        do {
            candidate = "ORD-"+ Instant.now().getEpochSecond() +"-"+UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        } while (orderRepository.existsByOrderNumber(candidate));

        return candidate;
    }

    private int clampSize(int size){
        if (size <= 0 ) return 20;

        return Math.min(size, 100);
    }

}
