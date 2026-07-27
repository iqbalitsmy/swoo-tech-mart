package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.OrderStatusUpdateRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.OrderAdminSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.OrderDetailsResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PageResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.service.AdminOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {
    private final AdminOrderService adminOrderService;

    @GetMapping
    public ApiResponse<PageResponse<OrderAdminSummaryResponse>> listAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) Long userId
            ){
        return ApiResponse.success("Orders fetched", adminOrderService.listAll(page, size, status, userId));
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<OrderDetailsResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody OrderStatusUpdateRequest request
            ){
        return ApiResponse.success("Order status updated", adminOrderService.updateStatus(id, request.status()));
    }
}
