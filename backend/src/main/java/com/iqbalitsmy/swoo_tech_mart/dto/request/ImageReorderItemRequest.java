package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotNull;

public record ImageReorderItemRequest(
        @NotNull(message = "imageId is required")
        Long imageId,

        @NotNull(message = "sortOrder is required")
        Integer sortOrder
) {
}
