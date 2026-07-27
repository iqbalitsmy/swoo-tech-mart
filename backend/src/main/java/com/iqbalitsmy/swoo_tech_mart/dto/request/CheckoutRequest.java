package com.iqbalitsmy.swoo_tech_mart.dto.request;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import jakarta.validation.constraints.NotNull;

public record CheckoutRequest(
        @NotNull(message = "shippingAddressId is required")
        Long shippingAddressId,

        @NotNull(message = "paymentProvider is required")
        PaymentProvider paymentProvider
) {
}
