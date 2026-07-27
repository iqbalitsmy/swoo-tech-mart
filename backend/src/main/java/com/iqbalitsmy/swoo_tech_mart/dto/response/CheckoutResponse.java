package com.iqbalitsmy.swoo_tech_mart.dto.response;

public record CheckoutResponse(
    OrderDetailsResponse order,
    PaymentInitiationResponse payment
) {
}
