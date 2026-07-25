package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotNull;

public record CartMergeRequest(
        @NotNull(message = "guestSessionId is required")
        String guestSessionId
) {
}
