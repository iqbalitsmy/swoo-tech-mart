package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Tag;

public record TagResponse(
        Long id,
        String label
) {
    public static TagResponse fromEntity(Tag tag) {
        return new TagResponse(tag.getId(), tag.getLabel());
    }
}
