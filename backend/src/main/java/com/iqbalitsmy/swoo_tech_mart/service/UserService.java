package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ChangePasswordRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.UpdateProfileRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public UserResponse getProfile(Long userId) {
        User user = findUserOrThrow(userId);

        return UserResponse.fromEntity(user);
    }

    @Transactional
    public UserResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = findUserOrThrow(userId);

        if (StringUtils.hasText(request.fullName())){
            user.setFullName(request.fullName());
        }

        if(request.avatarUrl() != null){
            user.setAvatarUrl(request.avatarUrl());
        }

        return UserResponse.fromEntity(userRepository.save(user));
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {
        User user = findUserOrThrow(userId);
        if (user.getPassword() == null){
            throw new BadRequestException(
                    "This account signed up via "+user.getProvider() + "and has no password to change"
            );
        }

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())){
            throw new BadRequestException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    @Transactional
    public void deactivateAccount(Long userId) {
        User user = findUserOrThrow(userId);
        user.setEnabled(false);
        userRepository.save(user);
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}
