package com.iqbalitsmy.swoo_tech_mart.dto.response;

public record ProductReviewResponse(
        PageResponse<ReviewResponse> review,
        double averageRating,
        long totalReview
) {
}
