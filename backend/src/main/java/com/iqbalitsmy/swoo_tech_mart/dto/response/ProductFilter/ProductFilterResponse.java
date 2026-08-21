package com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter;

import java.util.List;

public record ProductFilterResponse(
        CategoryFilterSection categories,
        List<BrandFilter> brands,
        PriceRangeFilter priceRanges,
        List<RatingFilter> ratings,
        List<AttributeFilterValue> colors,
        List<AttributeFilterValue> memory
) {
}
