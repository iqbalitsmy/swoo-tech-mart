package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CheckoutRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.*;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<CheckoutResponse>> checkout(@AuthenticationPrincipal UserPrincipal principal, @Valid @RequestBody CheckoutRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Order placed", orderService.checkout(principal.getId(), request)));
    }

    @GetMapping
    public ApiResponse<PageResponse<OrderSummaryResponse>> listMyOrders(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) OrderStatus status
            ){
        return ApiResponse.success("Orders fetched", orderService.listForUser(principal.getId(), page, size, status));
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderDetailsResponse> getById(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id){
        boolean isAdmin = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_ADMIN"));

        return ApiResponse.success("Order fetched", orderService.getById(id, principal.getId(), isAdmin));
    }

    @PatchMapping("/{id}/cancel")
    public ApiResponse<OrderDetailsResponse> cancel(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id){
        return ApiResponse.success("Order cancelled", orderService.cancel(id, principal.getId()));
    }

}
