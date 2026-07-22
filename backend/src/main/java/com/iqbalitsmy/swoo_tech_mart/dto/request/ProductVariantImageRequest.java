package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProductVariantImageRequest (
        @NotBlank(message = "url is required")
        String url,

        Integer sortOrder
) {
}
