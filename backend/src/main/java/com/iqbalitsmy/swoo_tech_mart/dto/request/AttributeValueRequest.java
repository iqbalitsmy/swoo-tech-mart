package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AttributeValueRequest(
        @NotBlank(message = "label is required")
        @Size(max=100)
        String label,

        @NotBlank(message = "value is required")
        @Size(max=100)
        String value
) {
}
