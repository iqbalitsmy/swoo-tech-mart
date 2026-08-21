package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.WishlistItem;

import java.time.Instant;

public record WishlistItemResponse(
        Long id,
        ProductSummaryResponse product,
        Instant addedAt
) {

    public static WishlistItemResponse fromEntity(WishlistItem item, ProductSummaryResponse product) {
        return new WishlistItemResponse(
                item.getId(),
                product,
                item.getAddedAt()
        );
    }
}