package com.iqbalitsmy.swoo_tech_mart.dto.request;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.StockStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProductRequest(
        @NotBlank(message = "SKU is required")
        @Size(max = 100)
        String sku,

        @NotBlank(message = "Title is required")
        @Size(max = 255)
        String title,

        @NotBlank(message = "Slug is required")
        @Size(max = 255)
        String slug,

        Long categoryId,

        Long brandId,

        @NotNull(message = "Stock status is required")
        StockStatus stockStatus,

        @NotNull(message = "isNew is required")
        Boolean isNew,


        List<Long> tagIds
) {
}
