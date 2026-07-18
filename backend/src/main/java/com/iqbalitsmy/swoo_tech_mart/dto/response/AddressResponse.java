package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Address;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.AddressType;

public record AddressResponse(
        Long id,
        String recipientName,
        String line1,
        String line2,
        String city,
        String state,
        String postalCode,
        String country,
        AddressType type,
        boolean isDefault
) {
    public static AddressResponse fromEntity(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getRecipientName(),
                address.getLine1(),
                address.getLine2(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry(),
                address.getType(),
                address.isDefault()
        );
    }
}
