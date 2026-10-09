package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;

import java.math.BigDecimal;
import java.util.List;

public record ProductVariantResponse(
        Long id,
        Long productId,
        String sku,
        BigDecimal price,
        Integer stockQty,
//        String imageUrl,
        boolean active,
        List<VariantAttributeRef> attributes,
        List<ProductVariantImageResponse> images
) {
    public static  ProductVariantResponse fromEntity(
            ProductVariant variant,
            List<VariantAttributeRef> attributes,
            List<ProductVariantImageResponse> images
    ){
        return new ProductVariantResponse(
                variant.getId(),
                variant.getProduct().getId(),
                variant.getSku(),
                variant.getPrice(),
                variant.getStockQty(),
//                variant.getImageUrl(),
                variant.getActive(),
                attributes,
                images
        );
    }
}
