package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.AttributeValue;

public record AttributeValueResponse(
        Long id,
        String label,
        String value,
        Long attributeTypeId
) {
    public static  AttributeValueResponse fromEntity(AttributeValue attributeValue){
        return new AttributeValueResponse(
                attributeValue.getId(),
                attributeValue.getLabel(),
                attributeValue.getValue(),
                attributeValue.getAttributeType().getId()
        );
    }
}
