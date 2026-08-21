package com.iqbalitsmy.swoo_tech_mart.dto.response;

public record ProductReviewResponse(
        PageResponse<ReviewResponse> reviews,
        double averageRating,
        long totalReview,
        ReviewResponse myReview
) {
}
