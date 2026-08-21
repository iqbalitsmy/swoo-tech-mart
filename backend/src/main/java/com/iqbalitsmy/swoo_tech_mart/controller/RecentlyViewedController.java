package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.RecentlyViewedService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/recently-viewed")
@RequiredArgsConstructor
public class RecentlyViewedController {

    private static final String SESSION_COOKIE = "sessionId";
    private static final String SESSION_HEADER = "X-Guest-Session-Id";

    private final RecentlyViewedService  recentlyViewedService;

    @GetMapping
    public ApiResponse<List<ProductSummaryResponse>> getRecentlyViewed(
            @AuthenticationPrincipal UserPrincipal principal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @CookieValue(name = SESSION_HEADER, required = false) String sessionHeader,
            @RequestParam(defaultValue = "10") int limit
            ){
        String sessionId = resolveIncoming(sessionHeader, sessionCookie);

        return ApiResponse.success("Recently viewed products fetched", recentlyViewedService.getRecentlyViewed(userId(principal), sessionId, limit));
    }

    @PostMapping("/{productId}")
    public ApiResponse<Void> recordView(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
            @PathVariable Long productId,
            HttpServletResponse response
    ){
        Long userId = userId(userPrincipal);
        String sessionId = resolveIncoming(sessionHeader, sessionCookie);

        if (userId == null && (sessionId == null || sessionId.isBlank())) {
            sessionId = UUID.randomUUID().toString();
        }

        recentlyViewedService.recordView(userId, sessionId, productId);
        persistSession(response, userPrincipal, sessionId);

        return ApiResponse.success("View record");
    }

    @DeleteMapping("/{productId}")
    public ApiResponse<Void> removeOne(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
            @PathVariable Long productId
    ) {
        recentlyViewedService.removeOne(userId(userPrincipal), resolveIncoming(sessionHeader, sessionCookie), productId);

        return ApiResponse.success("Removed recently viewed product");
    }

    @DeleteMapping
    public ApiResponse<Void> clearAll(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader
    ) {
        recentlyViewedService.clearAll(userId(userPrincipal), resolveIncoming(sessionHeader, sessionCookie));

        return ApiResponse.success("Recently viewed history cleared");
    }

    //----helpers-------

    private Long userId(UserPrincipal principal){
        return principal != null ? principal.getId() : null;
    }

    private String resolveIncoming(String header, String cookie){
        return header != null && !header.isBlank() ? header : cookie;
    }

    private void persistSession(HttpServletResponse response, UserPrincipal userPrincipal, String sessionId){
        if (userPrincipal != null || sessionId != null) return;

        response.setHeader(SESSION_HEADER, sessionId);

        response.addHeader("Set-Cookie", SESSION_COOKIE + "=" + sessionId + "; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax");
    }

}
