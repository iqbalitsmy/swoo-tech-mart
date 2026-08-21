package com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter;

import com.iqbalitsmy.swoo_tech_mart.entity.Brand;

public record BrandFilter(
        Long id,
        String name,
        String slug,
        String logoUrl,
        int productCount
) {
    public static  BrandFilter fromEntity(Brand brand, int productCount) {
        return new BrandFilter(
                brand.getId(),
                brand.getName(),
                brand.getSlug(),
                brand.getLogoUrl(),
                productCount
        );
    }
}
