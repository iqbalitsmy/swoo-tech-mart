package com.iqbalitsmy.swoo_tech_mart.dto.response;

public record AuthResponse(
        String tokenType,
        String accessToken,
        long expiresInMs,
        UserResponse user
) {
    public AuthResponse(String accessToken,  long expiresInMs, UserResponse user) {
        this("Bearer", accessToken, expiresInMs, user);
    }
}
