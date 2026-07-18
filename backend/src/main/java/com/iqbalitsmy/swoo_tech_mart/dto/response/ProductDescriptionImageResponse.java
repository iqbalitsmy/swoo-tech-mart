package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductDescriptionImage;

public record ProductDescriptionImageResponse(
        Long id,
        String url,
        String altText,
        Integer sortOrder
) {
    public static  ProductDescriptionImageResponse fromEntity(ProductDescriptionImage image) {
        return new ProductDescriptionImageResponse(
                image.getId(),
                image.getUrl(),
                image.getAltText(),
                image.getSortOrder()
        );
    }
}
