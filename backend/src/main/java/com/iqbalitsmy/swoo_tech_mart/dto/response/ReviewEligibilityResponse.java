package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.ReviewEligibilityReason;

public record ReviewEligibilityResponse(
        Boolean canReview,
        Boolean hasReview,
        Long reviewId,
        ReviewEligibilityReason reason
) {
}
