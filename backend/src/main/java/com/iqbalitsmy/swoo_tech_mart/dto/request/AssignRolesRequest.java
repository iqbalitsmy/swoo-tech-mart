package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record AssignRolesRequest(
        @NotEmpty(message = "At least one role id is required")
        List<Long> roleIds
) {
}
