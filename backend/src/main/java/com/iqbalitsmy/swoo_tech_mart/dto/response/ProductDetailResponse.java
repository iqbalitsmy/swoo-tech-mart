package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.Tag;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.StockStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record ProductDetailResponse(
        Long id,
        String sku,
        String title,
        String slug,
        CategoryRef category,
        BrandRef brand,
        BigDecimal maxPrice,
        BigDecimal minPrice,
        StockStatus stockStatus,
        boolean isNew,
        Set<String> tags,
        List<ProductImageResponse>  images,
        List<ProductHighlightResponse> highlights,
        List<ProductVariantSummaryResponse> variants,
        Instant createdAt
) {
    public static  ProductDetailResponse fromEntity(
            Product product,
            List<ProductImageResponse> images,
            List<ProductHighlightResponse> highlight,
            List<ProductVariantSummaryResponse> variants
    ){
        return   new ProductDetailResponse(
                product.getId(),
                product.getSku(),
                product.getTitle(),
                product.getSlug(),
                CategoryRef.fromEntity(product.getCategory()),
                BrandRef.fromEntity(product.getBrand()),
                product.getMinPrice(),
                product.getMaxPrice(),
                product.getStockStatus(),
                product.isNew(),
                product.getTags().stream().map(Tag::getLabel).collect(Collectors.toSet()),
                images,
                highlight,
                variants,
                product.getCreatedAt()
        );
    }
}
