package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.AttributeValue;

public record ProductAttributeResponse(
        Long id,
        String label,
        String value,
        AttributeTypeResponse attributeType
) {
    public static ProductAttributeResponse  fromEntity(AttributeValue attributeValue){
        return new ProductAttributeResponse(
                attributeValue.getId(),
                attributeValue.getLabel(),
                attributeValue.getValue(),
                AttributeTypeResponse.fromEntity(attributeValue.getAttributeType())
        );
    }
}
