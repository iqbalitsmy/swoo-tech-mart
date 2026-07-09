package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.iqbalitsmy.swoo_tech_mart.entity.Role;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.AuthProvider;

import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

public record UserResponse(
        Long id,
        String fullName,
        String email,
        String avatarUrl,
        AuthProvider provider,
        boolean enabled,
        Instant createdAt,
        Set<String> roles
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getAvatarUrl(),
                user.getProvider(),
                user.isEnabled(),
                user.getCreatedAt(),
                user.getRoles().stream().map(Role::getName).collect(Collectors.toSet())
        );
    }
}
