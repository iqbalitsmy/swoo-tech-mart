package com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter;

public record AttributeFilterValue(
        Long id,
        String label,
        String value,
        int productCount
) {
}
