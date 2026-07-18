package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductDescriptionSectionRequest(
        @NotBlank(message = "title is required")
        @Size(max = 255)
        String title,

        @NotBlank(message = "body is required")
        String body,

        Integer sortOrder
) {
}
