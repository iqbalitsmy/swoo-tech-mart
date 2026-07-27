package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentStatus;

import java.math.BigDecimal;

/**
 * clientSecret / redirectUrl are whatever the gateway needs the frontend to
 * continue checkout with (e.g. Stripe Elements takes a clientSecret; a
 * redirect-based provider like PayPal takes a redirectUrl). Only one is
 * typically populated depending on the provider's integration style — the
 * mock gateway sets both since it isn't a real integration.
 */
public record PaymentInitiationResponse(
    Long paymentId,
    Long orderId,
    PaymentProvider provider,
    PaymentStatus status,
    BigDecimal amount,
    String clientSecret,
    String redirectUrl
) {
    public static PaymentInitiationResponse of(Payment payment, String clientSecret, String redirectUrl){
        return new PaymentInitiationResponse(
                payment.getId(),
                payment.getOrder().getId(),
                payment.getProvider(),
                payment.getStatus(),
                payment.getAmount(),
                clientSecret,
                redirectUrl
        );
    }
}
