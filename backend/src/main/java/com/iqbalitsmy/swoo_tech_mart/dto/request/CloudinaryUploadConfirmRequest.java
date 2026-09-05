package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CloudinaryUploadConfirmRequest(
        @NotBlank String publicId,
        @NotBlank String secureUrl
) {
}
