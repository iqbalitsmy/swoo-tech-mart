package com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter;

import java.util.List;

public record CategoryFilterSection(
        CategoryFilter parent,
        List<CategoryFilter> categories
) {
}
