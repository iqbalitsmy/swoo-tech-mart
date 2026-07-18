package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
        @NotBlank(message = "Category name is required")
        @Size(max = 150)
        String name,

        @NotBlank(message = "slug is required")
        @Size(max = 180)
        String slug,

        Long parentCategoryId
) {
}
