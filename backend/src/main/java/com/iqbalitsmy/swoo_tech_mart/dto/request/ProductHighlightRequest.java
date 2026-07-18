package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductHighlightRequest(
        @NotBlank(message = "text is required")
        @Size(max = 500)
        String text,

        Integer sortOrder
) {
}
