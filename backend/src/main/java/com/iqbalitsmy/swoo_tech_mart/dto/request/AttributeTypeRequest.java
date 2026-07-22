package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AttributeTypeRequest(

        @NotBlank(message = "name is required")
        @Size(max=100)
        String name
) {
}
