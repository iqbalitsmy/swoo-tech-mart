package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ChangePasswordRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.UpdateProfileRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // get current user
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal){
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", userService.getProfile(principal.getId())));
    }

    // update current password
    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateCurrentUser(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody UpdateProfileRequest request){
        return ResponseEntity.ok(ApiResponse.success("Profile updated", userService.updateProfile(principal.getId(), request)));
    }

    // change current user password
    @PatchMapping("/me/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody ChangePasswordRequest request){
        userService.changePassword(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Password changed"));
    }

    // Deactivate current user
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<Void>> deactivateCurrentUser(@AuthenticationPrincipal UserPrincipal principal){
        userService.deactivateAccount(principal.getId());

        return ResponseEntity.ok(ApiResponse.success("Account deactivated"));
    }
}
