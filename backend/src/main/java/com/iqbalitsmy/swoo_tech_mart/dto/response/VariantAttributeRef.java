package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.AttributeValue;

public record VariantAttributeRef(
        Long attributeTypeId,
        String attributeTypeName,
        Long attributeValueId,
        String label,
        String value
) {
    public static VariantAttributeRef fromEntity(AttributeValue attributeValue){
        return new VariantAttributeRef(
                attributeValue.getAttributeType().getId(),
                attributeValue.getAttributeType().getName(),
                attributeValue.getId(),
                attributeValue.getLabel(),
                attributeValue.getValue()
        );
    }
}
