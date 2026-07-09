package com.iqbalitsmy.swoo_tech_mart.dto.response;

public record AuthResponse(
        String tokenType,
        String accessToken,
        String refreshToken,
        long expiresInMs,
        UserResponse user
) {
    public AuthResponse(String accessToken, String refreshToken, long expiresInMs, UserResponse user) {
        this("Bearer", accessToken, refreshToken, expiresInMs, user);
    }
}
