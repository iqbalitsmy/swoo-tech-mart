package com.iqbalitsmy.swoo_tech_mart.dto.request;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderStatusUpdateRequest(
        @NotNull(message = "status is required")
        OrderStatus status
) {
}
