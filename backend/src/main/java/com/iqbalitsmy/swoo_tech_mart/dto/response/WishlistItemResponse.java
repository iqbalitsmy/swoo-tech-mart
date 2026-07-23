package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.WishlistItem;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record WishlistItemResponse(
        Long id,
        Long productId,
        String productTitle,
        String productSlug,
        Long variantId,
        String variantSku,
        BigDecimal price,
        Integer stockQty,
        String imageUrl,
        List<VariantAttributeRef> attributes,
        Instant addedAt
) {
    public static WishlistItemResponse fromEntity(WishlistItem item, List<VariantAttributeRef> attributes, String imageUrl) {
        var variant = item.getProductVariant();
        var product = variant.getProduct();

        return new WishlistItemResponse(
                item.getId(),
                product.getId(),
                product.getTitle(),
                product.getSlug(),
                variant.getId(),
                variant.getSku(),
                variant.getPrice(),
                variant.getStockQty(),
                imageUrl,
                attributes,
                item.getAddedAt()
        );
    }
}
