package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderDetailsResponse(
        Long id,
        String orderNumber,
        OrderStatus status,
        List<OrderItemResponse> items,
        ShippingSnapshotResponse shippingSnapshot,
        BigDecimal subtotal,
        BigDecimal shippingFee,
        BigDecimal totalAmount,
        PaymentProvider paymentProvider,
        /** Convenience denormalization of the latest Payment's status — null until a payment attempt exists. */
        PaymentStatus latestPaymentStatus,
        Instant createdAt,
        Instant updatedAt
) {
    public static OrderDetailsResponse fromEntity(Order order, List<OrderItemResponse> items, PaymentStatus latestPaymentStatus) {
        return new OrderDetailsResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getStatus(),
                items,
                ShippingSnapshotResponse.fromOrder(order),
                order.getSubTotal(),
                order.getShippingFee(),
                order.getTotalAmount(),
                order.getPaymentProvider(),
                latestPaymentStatus,
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }
}
