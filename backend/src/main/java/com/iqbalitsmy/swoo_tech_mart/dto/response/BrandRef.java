package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Brand;

public record BrandRef (
        Long id,
        String name,
        String slug,
        String logoUrl
){
    public static BrandRef fromEntity(Brand brand){
        if(brand == null){
            return null;
        }
        return new BrandRef(brand.getId(), brand.getName(), brand.getSlug(), brand.getLogoUrl());
    }
}
