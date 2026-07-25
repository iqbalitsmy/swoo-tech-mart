package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemAddRequest(
        @NotNull(message = "productId is required")
        Long productId,

        @NotNull(message = "variantId is required")
        Long variantId,

        @NotNull(message = "quantity is required")
        @Min(value = 1, message = "quantity must be at least 1")
        Integer quantity
) {
}
