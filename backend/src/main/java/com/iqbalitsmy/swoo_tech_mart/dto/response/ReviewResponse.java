package com.iqbalitsmy.swoo_tech_mart.dto.response;


import com.iqbalitsmy.swoo_tech_mart.entity.Review;

import java.time.Instant;

public record ReviewResponse(
        Long id,
        Long productId,
        ReviewerRef reviewer,
        Integer rating,
        String body,
        Instant createdAt,
        Instant updatedAt
) {
    public static ReviewResponse fromEntity(Review review) {
        return  new ReviewResponse(
          review.getId(),
          review.getProduct().getId(),
          ReviewerRef.fromUser(review.getUser()),
          review.getRating(),
          review.getBody(),
          review.getCreatedAt(),
          review.getUpdatedAt()
        );
    }
}
