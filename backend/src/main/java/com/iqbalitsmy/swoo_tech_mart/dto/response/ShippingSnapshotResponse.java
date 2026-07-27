package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Order;

public record ShippingSnapshotResponse(
        String recipientName,
        String line1,
        String line2,
        String city,
        String state,
        String postalCode
) {
    public static ShippingSnapshotResponse fromOrder(Order order){
        return new ShippingSnapshotResponse(
                order.getShippingRecipientName(),
                order.getShippingLine1(),
                order.getShippingLine2(),
                order.getShippingCity(),
                order.getShippingState(),
                order.getShippingPostalCode()
        );
    }
}
