package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ProductVariantUpdateRequest (
        @NotBlank(message = "sku is required")
        @Size(max=100)
        String sku,

        @NotNull(message = "price is required")
        @DecimalMin(value = "0.0", inclusive = true, message = "price can't be negative")
        BigDecimal price,

        @NotNull(message = "stockQty is required")
        @Min(value = 0, message = "Stock quantity can't be less than 0")
        Integer stockQty,

        @Size(max=500)
        String imageUrl
) {
}
