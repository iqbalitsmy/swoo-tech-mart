package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ReviewRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductReviewResponse;
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

    @GetMapping("/api/products/{id}/review")
    public ApiResponse<ProductReviewResponse> listForProduct(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String sort
    ){
        return ApiResponse.success("Reviews fetched", reviewService.listForProduct(id, page, size, sort));
    }

    @PostMapping("/api/products/{id}/review")
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

    @DeleteMapping("/api/review/{id}")
    public ApiResponse<Void> delete(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id) {
        boolean isAdmin = userPrincipal.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        reviewService.delete(userPrincipal.getId(), isAdmin, id);
        return ApiResponse.success("Review deleted");
    }
}
