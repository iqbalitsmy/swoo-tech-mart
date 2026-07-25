package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.entity.Cart;

public record CartResolution(
        Cart cart,
        String sessionId
) {
}
