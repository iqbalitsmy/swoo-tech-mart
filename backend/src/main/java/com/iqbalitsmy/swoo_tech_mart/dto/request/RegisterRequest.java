package com.iqbalitsmy.swoo_tech_mart.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Full name is required")
        @Size(min = 2, max = 150)
        String fullName,

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @Size(max = 100)
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 3, max = 100, message = "Password must be at least 3 character")
//        @Pattern(
//                regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
//                message = "Password must be contain at least one letter and one number"
//        )
        String password

) {
}
