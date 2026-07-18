package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Brand;

public record BrandResponse(
        Long id,
        String name,
        String slug,
        String logoUrl
) {
    public static BrandResponse fromEntity(Brand brand) {
        return new BrandResponse(brand.getId(), brand.getName(), brand.getSlug(), brand.getLogoUrl());
    }
}
