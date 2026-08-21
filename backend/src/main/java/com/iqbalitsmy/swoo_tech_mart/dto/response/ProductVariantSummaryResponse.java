package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;

import java.math.BigDecimal;
import java.util.List;

public record ProductVariantSummaryResponse(
        Long id,
        String sku,
        BigDecimal price,
        Integer stockQty,
        List<ProductVariantImageResponse> images,
        List<ProductAttributeResponse> attributes
) {
    public static ProductVariantSummaryResponse fromEntity(
            ProductVariant variant,
            List<ProductVariantImageResponse> images,
            List<ProductAttributeResponse> attributes
    ) {
        return new ProductVariantSummaryResponse(
                variant.getId(),
                variant.getSku(),
                variant.getPrice(),
                variant.getStockQty(),
                images,
                attributes
        );
    }
}
