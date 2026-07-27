package com.iqbalitsmy.swoo_tech_mart.dto.response;


import com.iqbalitsmy.swoo_tech_mart.entity.OrderItem;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long variantId,
        String productTitleSnapshot,
        String skuSnapshot,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal
) {
    public static OrderItemResponse fromEntity(OrderItem item) {
        return new OrderItemResponse(
                item.getId(),
                item.getProductVariant().getId(),
                item.getProductTitleSnapshot(),
                item.getSkuSnapshot(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
        );
    }
}
