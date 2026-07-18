package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;

import java.math.BigDecimal;

public record ProductVariantSummaryResponse(
        Long id,
        String sku,
        BigDecimal price,
        Integer stockQty,
        String imageUrl
) {
    public static ProductVariantSummaryResponse fromEntity(ProductVariant variant) {
        return new ProductVariantSummaryResponse(
                variant.getId(),
                variant.getSku(),
                variant.getPrice(),
                variant.getStockQty(),
                variant.getImageUrl()
        );
    }
}
