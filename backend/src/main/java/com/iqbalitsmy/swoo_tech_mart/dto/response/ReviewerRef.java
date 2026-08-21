package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.User;

public record ReviewerRef(
        Long id,
        String name,
        String avatarUrl
) {
    public static ReviewerRef fromUser(User user) {
        return new ReviewerRef(
                user.getId(),
                user.getFullName(),
                user.getAvatarUrl()
        );
    }
}
