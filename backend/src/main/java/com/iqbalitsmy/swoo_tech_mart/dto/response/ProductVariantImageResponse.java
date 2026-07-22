package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariantImage;

public record ProductVariantImageResponse(
        Long id,
        String url,
        Integer sortOrder
) {
    public static ProductVariantImageResponse fromEntity(ProductVariantImage image){
        return new ProductVariantImageResponse(
                image.getId(),
                image.getUrl(),
                image.getSortOrder()
        );
    }
}
