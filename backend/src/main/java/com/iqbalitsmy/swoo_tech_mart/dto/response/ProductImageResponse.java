package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductImage;

public record ProductImageResponse(
        Long id,
        String url,
        Integer sortOrder
) {
    public static ProductImageResponse fromEntity(ProductImage image){
        return new ProductImageResponse(
          image.getId(),
          image.getUrl(),
          image.getSortOrder()
        );
    }
}
