package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.CartItem;

import java.math.BigDecimal;
import java.util.List;

public record CartItemResponse(
        Long id,
        Long productId,
        String productTitle,
        String productSlug,
        Long variantId,
        String variantSku,
        List<VariantAttributeRef> attributes,
        String imageUrl,
        Integer quantity,
        BigDecimal unitPriceSnapshot,
        BigDecimal currentPrice,
        boolean priceChanged,
        BigDecimal lineTotal,
        boolean inStock

) {
    public static CartItemResponse fromEntity(CartItem item, List<VariantAttributeRef> attributes, String imageUrl) {
        var variant = item.getProductVariant();
        BigDecimal current = variant.getPrice();
        BigDecimal snapshot = item.getUnitPriceSnapshot();

        return new CartItemResponse(
              item.getId(),
              variant.getProduct().getId(),
              variant.getProduct().getTitle(),
              variant.getProduct().getSlug(),
              variant.getId(),
                variant.getSku(),
                attributes,
                imageUrl,
                item.getQuantity(),
                snapshot,
                current,
                current.compareTo(snapshot) != 0,
                snapshot.multiply(BigDecimal.valueOf(item.getQuantity())),
                variant.getActive() && variant.getStockQty() >= item.getQuantity()
        );
    }
}
