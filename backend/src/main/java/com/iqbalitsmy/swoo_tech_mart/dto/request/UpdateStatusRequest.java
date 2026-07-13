package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(
        @NotNull(message = "enabled is required")
        Boolean enabled
) {
}
