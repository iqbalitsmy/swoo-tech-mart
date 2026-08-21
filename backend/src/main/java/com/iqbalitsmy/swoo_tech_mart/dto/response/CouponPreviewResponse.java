package com.iqbalitsmy.swoo_tech_mart.dto.response;

import java.math.BigDecimal;

public record CouponPreviewResponse(
        String code,
        boolean applied,
        BigDecimal discountAmount,
        String message
) {

}
