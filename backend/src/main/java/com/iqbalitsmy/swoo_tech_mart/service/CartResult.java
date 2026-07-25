package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.CartResponse;

public record CartResult(
        CartResponse response,
        String sessionId
) {
}
