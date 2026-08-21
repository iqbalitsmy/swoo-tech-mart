package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.AuthResponse;

public record AuthResult(AuthResponse response, String refreshToken) {
}
