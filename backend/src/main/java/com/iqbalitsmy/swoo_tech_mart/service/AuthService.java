package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.LoginRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.RegisterRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AuthResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.UserResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.RefreshToken;
import com.iqbalitsmy.swoo_tech_mart.entity.Role;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.AuthProvider;
import com.iqbalitsmy.swoo_tech_mart.exception.EmailAlreadyExistsException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.RoleRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import com.iqbalitsmy.swoo_tech_mart.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider  tokenProvider;
    private final RefreshTokenService refreshTokenService;

    @Transactional
    public UserResponse register(RegisterRequest request){
        if (userRepository.existsByEmail(request.email())){
            throw new EmailAlreadyExistsException("Email Already Exists");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalStateException("ROLE_USER not seeded"));

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .provider(AuthProvider.local)
                .enabled(true)
                .createdAt(Instant.now())
                .roles(Set.of(userRole))
                .build();
        User savedUser = userRepository.save(user);
        return UserResponse.fromEntity(savedUser);
    }

    @Transactional
    public AuthResponse login(LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return buildAuthResponse(user);
    }

    @Transactional
    public AuthResponse refreshToken(String request){
        RefreshToken refreshToken = refreshTokenService.findByToken(request);
        refreshTokenService.verifyExpiry(refreshToken);

        User user = refreshToken.getUser();

        RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);
        String accessToken = tokenProvider.generateAccessToken(user.getId(), user.getEmail());

        return new AuthResponse(
                accessToken,
                newRefreshToken.getToken(),
                tokenProvider.getAccessTokenExpirationMs(),
                 UserResponse.fromEntity(user)
        );
    }

    @Transactional
    public void logout(String requestRefreshToken){
        RefreshToken refreshToken = refreshTokenService.findByToken(requestRefreshToken);

        refreshTokenService.deleteByUser(refreshToken.getUser());
    }

    private AuthResponse buildAuthResponse(User user) {
        String accessToken = tokenProvider.generateAccessToken(user.getId(), user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        return new AuthResponse(
                accessToken,
                refreshToken.getToken(),
                tokenProvider.getAccessTokenExpirationMs(),
                UserResponse.fromEntity(user)
        );
    }
}
