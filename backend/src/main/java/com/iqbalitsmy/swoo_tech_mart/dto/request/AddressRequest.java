package com.iqbalitsmy.swoo_tech_mart.dto.request;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.AddressType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddressRequest (
//        @NotBlank(message = "Recipient name is required")
        @Size(max = 150)
        String recipientName,

        @NotBlank(message = "Address line 1 is required")
        @Size(max = 255)
        String line1,

        @Size(max = 255)
        String line2,

        @NotBlank(message = "City is required")
        @Size(max = 100)
        String city,

        @NotBlank(message = "State is required")
        @Size(max = 100)
        String state,

        @NotBlank(message = "Postal code is required")
        @Size(max = 20)
        String postalCode,

        @NotBlank(message = "Country is required")
        @Size(max = 100)
        String country,

        @NotNull(message = "Type is required")
        AddressType type,

        @NotNull(message = "isDefault is required")
        Boolean isDefault
) {

}
