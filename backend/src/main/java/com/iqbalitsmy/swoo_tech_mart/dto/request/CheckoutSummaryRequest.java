package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotNull;

public record CheckoutSummaryRequest (
    @NotNull(message = "selectedAddressId is required")
    Long selectedAddressId,

    String couponCode
) {

}
