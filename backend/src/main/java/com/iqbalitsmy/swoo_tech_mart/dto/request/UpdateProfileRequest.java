package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
        @Size(max = 150)
        String fullName,

        @Size(max = 500)
        String avatarUrl
) {
}
