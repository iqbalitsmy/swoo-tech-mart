package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank(message = "Password is required")
        String currentPassword,

        @NotBlank(message = "Password is required")
        @Size(min = 3, max = 100, message = "Password must be at least 8 character")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
                message = "Password must be contain at least one letter and one number"
        )
        String newPassword
) {
}
