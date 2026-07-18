package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductDescriptionImageRequest(
        @NotBlank(message = "url is required")
        String url,

        @Size(max = 255)
        String altText,

        Integer sortOrder
) {
}
