package com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter;

import com.iqbalitsmy.swoo_tech_mart.entity.Category;

public record CategoryFilter(
        Long id,
        String name,
        String slug
) {
    public static  CategoryFilter fromEntity(Category category) {
        return new CategoryFilter(
                category.getId(),
                category.getName(),
                category.getSlug()
        );
    }
}
