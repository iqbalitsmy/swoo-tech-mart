package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.PageResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Role;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.RoleRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Transactional(readOnly = true)
    public PageResponse<UserResponse> listUsers(int page, int size, String search) {
        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                clampSize(size),
                Sort.by(Sort.Direction.ASC, "createdAt")
        );
        String normalizedSearch = StringUtils.hasText(search) ? search.trim() : null;

        Page<User> result = userRepository.search(normalizedSearch, pageable);

        return PageResponse.from(result.map(UserResponse::fromEntity));
    }

    @Transactional(readOnly = true)
    public UserResponse getUser(Long userId) {
        return UserResponse.fromEntity(findUserOrElseThrow(userId));
    }

    @Transactional
    public UserResponse updateRoles(Long userId, List<Long> roleIds) {
        User user = findUserOrElseThrow(userId);

        Set<Role> roles = new HashSet<>(roleRepository.findAllById(roleIds));
        // better than too many db request
        if (roles.size() != Set.copyOf(roleIds).size()) {
            throw new BadRequestException("One more role ids do not exist");
        }
        user.setRoles(roles);
        return UserResponse.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserResponse updateStatus(Long userId, boolean enabled) {
        User user = findUserOrElseThrow(userId);

        user.setEnabled(enabled);
        return UserResponse.fromEntity(userRepository.save(user));
    }

    private User findUserOrElseThrow(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: "+userId));
    }

    private int clampSize(int size) {
        if (size <= 0) return 20;
        return Math.min(size, 100);
    }
}
