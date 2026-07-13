package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.AssignRolesRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.UpdateStatusRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PageResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminController {
    private final AdminUserService adminUserService;

    @GetMapping
    public ApiResponse<PageResponse<UserResponse>> listUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search
    ){
        return ApiResponse.success("Users fetched", adminUserService.listUsers(page, size, search));
    }

    @GetMapping("/{userId}")
    public ApiResponse<UserResponse> getUser(@PathVariable Long userId){
        return ApiResponse.success("User fetched", adminUserService.getUser(userId));
    }

    @PatchMapping("/{userId}/roles")
    public ApiResponse<UserResponse> updateRoles(@PathVariable Long userId, @Valid @RequestBody AssignRolesRequest  request){
        return ApiResponse.success("Role updated", adminUserService.updateRoles(userId, request.roleIds()));
    }

    @PatchMapping("/{userId}/status")
    public ApiResponse<UserResponse> updateStatus(@PathVariable Long userId, @RequestBody UpdateStatusRequest request){
        return ApiResponse.success("Status updated", adminUserService.updateStatus(userId, request.enabled()));
    }
}
