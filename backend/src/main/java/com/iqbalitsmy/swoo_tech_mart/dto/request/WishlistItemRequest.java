package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotNull;

public record WishlistItemRequest(
        @NotNull(message = "productVariant Id is required")
        Long productVariantId
) {
}
