package com.iqbalitsmy.swoo_tech_mart.dto.response;

import java.util.List;

public record WishlistResponse(
        Long id,
        List<WishlistItemResponse> items
) {
}
