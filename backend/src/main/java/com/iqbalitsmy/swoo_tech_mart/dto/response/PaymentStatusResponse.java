package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentStatusResponse(
        Long paymentId,
        Long orderId,
        PaymentProvider provider,
        PaymentStatus status,
        BigDecimal amount,
        Instant paidAt,
        String failureReason
) {
    public static PaymentStatusResponse fromEntity(Payment payment){
        return new PaymentStatusResponse(
                payment.getId(),
                payment.getOrder().getId(),
                payment.getProvider(),
                payment.getStatus(),
                payment.getAmount(),
                payment.getPaidAt(),
                payment.getFailureReason()
        );
    }
}
