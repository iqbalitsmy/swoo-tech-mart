package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemUpdateRequest(
        @NotNull(message = "quantity is required")
        @Min(value = 1, message = "quantity must be at least 1 - use DELETE to remove the item")
        Integer quantity
) {
}
