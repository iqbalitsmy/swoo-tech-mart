package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Category;

public record CategoryResponse(
        Long id,
        String name,
        String slug,
        Long parentCategoryId
) {
    public static CategoryResponse fromEntity(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getParentCategory() != null ? category.getParentCategory().getId() : null
        );
    }
}
