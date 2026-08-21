package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.LoginRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.RefreshTokenRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.RegisterRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AuthResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.exception.TokenRefreshException;
import com.iqbalitsmy.swoo_tech_mart.security.RefreshTokenCookieHelper;
import com.iqbalitsmy.swoo_tech_mart.service.AuthResult;
import com.iqbalitsmy.swoo_tech_mart.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final RefreshTokenCookieHelper  refreshTokenCookieHelper;

    // ── POST /auth/register ───────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request){
//        UserResponse userResponse = authService.register(request);
        AuthResult result = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Account created successfully", result.response()));
    }

    // ── POST /auth/login ──────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response){
        AuthResult result = authService.login(request);
        refreshTokenCookieHelper.set(response, result.refreshToken());
        return ResponseEntity.ok(ApiResponse.success("Login successfully", result.response()));
    }

    // ── POST /auth/refresh ────────────────────────────────────────
    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(
            @CookieValue(name = RefreshTokenCookieHelper.COOKIE_NAME, required = false) String refreshTokenCookie,
            HttpServletResponse response
    ){
        if (refreshTokenCookie == null || refreshTokenCookie.isBlank()){
            throw new TokenRefreshException("(missing)", "No refresh token cookie present - please sign in again");
        }

        AuthResult result = authService.refreshToken(refreshTokenCookie);
        refreshTokenCookieHelper.set(response, result.refreshToken());

        return ResponseEntity.ok(ApiResponse.success("Token Refreshed successfully", result.response()));
    }

    // ── POST /auth/logout ─────────────────────────────────────────
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @CookieValue(name = RefreshTokenCookieHelper.COOKIE_NAME, required = false) String refreshTokenCookie,
            HttpServletResponse response
    ){
        if (refreshTokenCookie != null && !refreshTokenCookie.isBlank()){
            authService.logout(refreshTokenCookie);
        }

        refreshTokenCookieHelper.clear(response);

        return ResponseEntity.ok(ApiResponse.success("Logout successfully"));
    }
}
