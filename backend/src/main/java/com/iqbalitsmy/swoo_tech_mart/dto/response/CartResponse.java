package com.iqbalitsmy.swoo_tech_mart.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse(
        Long id,
        List<CartItemResponse> items,
        BigDecimal subtotal
) {
}
