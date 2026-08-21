package com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter;

import java.math.BigDecimal;

public record PriceRangeFilter(
        String label,
        BigDecimal min,
        BigDecimal max
) {
}
