package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductHighlight;

public record ProductHighlightResponse (
        Long id,
        String text,
        Integer sortOrder
) {
    public static ProductHighlightResponse fromEntity(ProductHighlight highlight) {
        return new ProductHighlightResponse(
                highlight.getId(),
                highlight.getText(),
                highlight.getSortOrder()
        );
    }
}
