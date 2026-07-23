package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.WishlistItemRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.WishlistItemResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.WishlistResponse;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ApiResponse<WishlistResponse> getWishlist(@AuthenticationPrincipal UserPrincipal userPrincipal) throws ResourceNotFoundException {
        return ApiResponse.success("wishlist fetched", wishlistService.getWishlist(userPrincipal.getId()));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<WishlistItemResponse>> addItem(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody WishlistItemRequest request) throws ResourceNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Add to wishlist", wishlistService.addItem(userPrincipal.getId(), request.productVariantId())));
    }

    @DeleteMapping("/items/{variantId}")
    public ApiResponse<Void> removeItem(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long variantId){
        wishlistService.removeItem(userPrincipal.getId(), variantId);
        return ApiResponse.success("Removed from wishlist");
    }

    @DeleteMapping
    public ApiResponse<Void> clearWishlist(@AuthenticationPrincipal UserPrincipal userPrincipal) throws ResourceNotFoundException {
        wishlistService.clearWishlist(userPrincipal.getId());
        return ApiResponse.success("Wishlisted cleared");
    }
}
