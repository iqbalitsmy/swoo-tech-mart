package com.iqbalitsmy.swoo_tech_mart.security.oauth2;

import com.iqbalitsmy.swoo_tech_mart.entity.Role;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.AuthProvider;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.repository.RoleRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        AuthProvider provider = AuthProvider.valueOf(registrationId.toLowerCase());

        String providerId = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String avatarUrl = oAuth2User.getAttribute("avatarUrl");

        if (email == null) {
            throw  new BadRequestException("Email not provided by OAuth2 provider: "+registrationId);
        }
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> createNewUser(provider, providerId, email, name, avatarUrl));
        user = linkOrUpdateExisting(user, provider, providerId, name, avatarUrl);

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }


    private User createNewUser(AuthProvider provider, String providerId, String email, String name, String avatarUrl) {
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalArgumentException("ROLE_USER not seeded"));

        User user = User.builder()
                .fullName(name != null ? name : email)
                .email(email)
                .provider(provider)
                .providerId(providerId)
                .avatarUrl(avatarUrl)
                .enabled(true)
                .createdAt(Instant.now())
                .roles(Set.of(userRole))
                .build();
        return userRepository.save(user);
    }

    // A local account signed up with the same email — link the OAuth2 identity to it.
    private User linkOrUpdateExisting(User user, AuthProvider provider, String providerId, String name, String avatarUrl) {
        if (user.getProvider() == AuthProvider.local && user.getProviderId() == null){
            user.setProvider(provider);
            user.setProviderId(providerId);
        }

        if (name != null) {
            user.setFullName(name);
        }
        if (avatarUrl != null) {
            user.setAvatarUrl(avatarUrl);
        }
        return userRepository.save(user);
    }


}
