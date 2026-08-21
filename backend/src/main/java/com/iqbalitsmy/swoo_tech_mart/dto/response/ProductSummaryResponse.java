package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.StockStatus;

import java.math.BigDecimal;

public record ProductSummaryResponse(
        Long id,
        String title,
        String slug,
        String imageUrl,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        StockStatus stockStatus,
        boolean isNew,
        boolean singleVariant,
        Long defaultVariantId
) {
    public static ProductSummaryResponse fromEntity(Product product, String imageUrl, boolean singleVariant, Long defaultVariantId) {
        return new ProductSummaryResponse(
          product.getId(),
          product.getTitle(),
          product.getSlug(),
          imageUrl,
          product.getMinPrice(),
          product.getMaxPrice(),
          product.getStockStatus(),
                product.isNew(),
                singleVariant,
                defaultVariantId
        );
    }
}
