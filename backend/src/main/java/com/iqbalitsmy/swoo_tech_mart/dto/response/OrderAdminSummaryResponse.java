package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record OrderAdminSummaryResponse(
        Long id,
        String orderNumber,
        Long userId,
        String userEmail,
        OrderStatus status,
        BigDecimal totalAmount,
        Instant createdAt
) {
    public static OrderAdminSummaryResponse fromEntity(Order order, String userEmail){
        return  new OrderAdminSummaryResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getUserId(),
                userEmail,
                order.getStatus(),
                order.getTotalAmount(),
                order.getCreatedAt()
        );
    }
}
