package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;

public record ProductImageRequest (
        @NotBlank(message = "Url is required")
        String url,

        Integer sortOrder
) {
}
