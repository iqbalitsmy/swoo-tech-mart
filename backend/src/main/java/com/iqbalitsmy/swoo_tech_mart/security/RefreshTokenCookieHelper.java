package com.iqbalitsmy.swoo_tech_mart.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenCookieHelper {

    public static final String COOKIE_NAME = "refreshToken";

    private static final String COOKIE_PATH = "/api/auth";

    private final long maxAgeSeconds;
    private final boolean secure;

    public RefreshTokenCookieHelper(
            @Value("${app.jwt.refresh-token-expiration-ms}") long refreshTokenExpirationMs,
            @Value("${app.jwt.refresh-cookie-secure:true}") boolean secure
    ) {
        this.maxAgeSeconds = refreshTokenExpirationMs / 1000;
        this.secure = secure;
    }

    public void set(HttpServletResponse response, String token) {
        response.addHeader("Set-Cookie", buildHeader(token, maxAgeSeconds));
    }

    public void clear(HttpServletResponse response) {
        response.addHeader("Set-Cookie", buildHeader("", 0));
    }

    private String buildHeader(String value, long maxAgeSeconds) {
        StringBuilder header = new StringBuilder()
                .append(COOKIE_NAME).append("=").append(value)
                .append("; Path=").append(COOKIE_PATH)
                .append("; Max-Age=").append(maxAgeSeconds)
                .append("; HttpOnly");

        if (secure) {
            header.append("; Secure");
        }

        header.append("; SameSite=").append(secure ? "None" : "Lax");

        return header.toString();
    }
}
