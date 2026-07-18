package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductDescriptionSection;
import java.util.List;

public record ProductDescriptionSectionResponse(
        Long id,
        String title,
        String body,
        Integer sortOrder,
        List<ProductDescriptionImageResponse> images
) {

    public static ProductDescriptionSectionResponse fromEntity(ProductDescriptionSection section,
                                                               List<ProductDescriptionImageResponse> images) {
        return new ProductDescriptionSectionResponse(
                section.getId(), section.getTitle(), section.getBody(), section.getSortOrder(), images);
    }
}
