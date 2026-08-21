package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.WishlistItemRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.WishlistItemResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.WishlistResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.WishlistService;
import jakarta.validation.Valid;
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
    public ApiResponse<WishlistResponse> getWishlist(@AuthenticationPrincipal UserPrincipal principal) {
        return ApiResponse.success("Wishlist fetched", wishlistService.getWishlist(principal.getId()));
    }

    @GetMapping("/check/{productId}")
    public ApiResponse<Boolean> isInWishlist(@PathVariable Long productId,
                                             @AuthenticationPrincipal UserPrincipal principal) {
        boolean exists = wishlistService.isInWishlist(principal.getId(), productId);
        return ApiResponse.success("Product is in wishlist", exists);
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<WishlistItemResponse>> addItem(@AuthenticationPrincipal UserPrincipal principal,
                                                                     @Valid @RequestBody WishlistItemRequest request) {
        WishlistItemResponse item = wishlistService.addItem(principal.getId(), request.productId());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Added to wishlist", item));
    }

    @DeleteMapping("/items/{productId}")
    public ApiResponse<Void> removeItem(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long productId) {
        wishlistService.removeItem(principal.getId(), productId);
        return ApiResponse.success("Removed from wishlist");
    }

    @DeleteMapping
    public ApiResponse<Void> clearWishlist(@AuthenticationPrincipal UserPrincipal principal) {
        wishlistService.clearWishlist(principal.getId());
        return ApiResponse.success("Wishlist cleared");
    }
}