package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Category;

public record CategoryRef (
        Long id,
        String name,
        String slug
) {
    public static CategoryRef fromEntity(Category category){
        if (category == null) return null;
        return new CategoryRef (category.getId(), category.getName(), category.getSlug());
    }
}
