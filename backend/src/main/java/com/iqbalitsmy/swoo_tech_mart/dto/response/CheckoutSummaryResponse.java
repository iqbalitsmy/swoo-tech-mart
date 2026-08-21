package com.iqbalitsmy.swoo_tech_mart.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record CheckoutSummaryResponse (
        List<CartItemResponse> items,
        AddressResponse shippingAddress,
        BigDecimal subtotal,
        BigDecimal shippingFee,
        BigDecimal discountAmount,
        BigDecimal totalAmount,
        /* null if no couponCode was submitted at all — distinct from "submitted but rejected" (applied=false). */
        CouponPreviewResponse coupon,
        boolean readyToCheckout,
        List<String> issues
        ) {

}
