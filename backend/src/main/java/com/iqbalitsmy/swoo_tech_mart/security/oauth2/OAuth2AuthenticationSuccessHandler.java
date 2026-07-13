package com.iqbalitsmy.swoo_tech_mart.security.oauth2;

import com.iqbalitsmy.swoo_tech_mart.entity.RefreshToken;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import com.iqbalitsmy.swoo_tech_mart.security.JwtTokenProvider;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.RefreshTokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService ;

    @Value("${app.oauth2.authorized-redirect-uris[0]}")
    private String authorizedRedirectUris;
//    private List<String> authorizedRedirectUris;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        var user = userRepository.findById(principal.getId()).orElseThrow(() -> new IllegalArgumentException("Authenticated user not found: "+principal.getId()));

        String accessToken = tokenProvider.generateAccessToken(user.getId(), user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        String targetUrl = UriComponentsBuilder.fromUriString(authorizedRedirectUris)
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken.getToken())
                .build().toUriString();

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
