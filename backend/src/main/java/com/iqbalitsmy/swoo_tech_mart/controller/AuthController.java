package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.LoginRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.RefreshTokenRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.RegisterRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AuthResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request){
        UserResponse userResponse = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Account created successfully", userResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request){
        AuthResponse authResponse = authService.login(request);

        return ResponseEntity.ok(ApiResponse.success("Login successfully", authResponse));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request){
        AuthResponse authResponse = authService.refreshToken(request.refreshToken());

        return ResponseEntity.ok(ApiResponse.success("Token Refreshed successfully", authResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody RefreshTokenRequest request){
        authService.logout(request.refreshToken());

        return ResponseEntity.ok(ApiResponse.success("Logout successfully"));
    }
}
