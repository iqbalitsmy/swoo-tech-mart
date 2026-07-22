package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.AttributeType;

public record AttributeTypeResponse(
        Long id,
        String name
) {
    public static AttributeTypeResponse fromEntity(AttributeType type){
        return new AttributeTypeResponse(type.getId(), type.getName());
    }
}
