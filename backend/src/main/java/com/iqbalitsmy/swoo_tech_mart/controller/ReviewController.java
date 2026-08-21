package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ReviewRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductReviewResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ReviewEligibilityResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ReviewResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/api/products/{id}/reviews")
    public ApiResponse<ProductReviewResponse> listForProduct(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String sort
    ){
        Long viewerId = userPrincipal != null ? userPrincipal.getId() : null;
        return ApiResponse.success("Reviews fetched", reviewService.listForProduct(id, page, size, sort, viewerId));
    }

    /**
     * Determines whether the current user is allowed to submit a review
     * for the product and returns the reason when they are not eligible.
     */
    @GetMapping("/api/products/{id}/review-eligibility")
    public ApiResponse<ReviewEligibilityResponse> getEligibility(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long userId = userPrincipal != null ? userPrincipal.getId() : null;
        return ApiResponse.success("", reviewService.checkEligibility(id, userId));
    }

    @PostMapping("/api/products/{id}/reviews")
    public ResponseEntity<ApiResponse<ReviewResponse>> create(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request
          ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Review submitted", reviewService.create(userPrincipal.getId(), id, request)));
    }

    @PutMapping("/api/reviews/{id}")
    public ApiResponse<ReviewResponse> update(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request
    ) {
        return ApiResponse.success("Review submitted", reviewService.update(userPrincipal.getId(), id, request));
    }

    @DeleteMapping("/api/reviews/{id}")
    public ApiResponse<Void> delete(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id) {
        boolean isAdmin = userPrincipal.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        reviewService.delete(userPrincipal.getId(), isAdmin, id);
        return ApiResponse.success("Review deleted");
    }
}
