package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CartItemAddRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.CartItemUpdateRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.CartMergeRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CartResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.CartResult;
import com.iqbalitsmy.swoo_tech_mart.service.CartService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private static final String SESSION_COOKIE = "SessionId";
    private static final String SESSION_HEADER = "X-Guest-Session-Id";

    private final CartService cartService;

    @GetMapping
    public ApiResponse<CartResponse> getCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
            HttpServletResponse response
            ){
        CartResult result = cartService.getCart(userId(userPrincipal), resolvedIncoming(sessionHeader, sessionCookie));

        persistSession(response, userPrincipal, result.sessionId());

        return ApiResponse.success("Cart fetched", result.response());
    }

    @PostMapping("/items")
    public ApiResponse<CartResponse> addItem(
                @AuthenticationPrincipal UserPrincipal userPrincipal,
                @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
                @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
                @Valid @RequestBody CartItemAddRequest request,
                HttpServletResponse response
            ){
        CartResult result = cartService.addItem(userId(userPrincipal), resolvedIncoming(sessionHeader, sessionCookie), request);
        persistSession(response, userPrincipal, result.sessionId());
        return ApiResponse.success("Cart updated", result.response());
    }

    @PatchMapping("/items/{itemId}")
    public ApiResponse<CartResponse> updateItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
            @PathVariable Long itemId,
            @Valid @RequestBody CartItemUpdateRequest request,
            HttpServletResponse response
    ){
        CartResult result = cartService.updateItemQuantity(userId(userPrincipal), resolvedIncoming(sessionHeader, sessionCookie), itemId, request);
        persistSession(response, userPrincipal, result.sessionId());
        return ApiResponse.success("Cart updated", result.response());
    }


    @DeleteMapping("/items/{itemId}")
    public ApiResponse<CartResponse> removeItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
            @PathVariable Long itemId,
            HttpServletResponse response
    ){
        CartResult result = cartService.removeItem(userId(userPrincipal), resolvedIncoming(sessionHeader, sessionCookie), itemId);
        persistSession(response, userPrincipal, result.sessionId());

        return ApiResponse.success("Item removed", result.response());
    }


    @DeleteMapping
    public ApiResponse<CartResponse> clearCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @CookieValue(name = SESSION_COOKIE, required = false) String sessionCookie,
            @RequestHeader(name = SESSION_HEADER, required = false) String sessionHeader,
            HttpServletResponse response
    ){
        CartResult result = cartService.clearCart(userId(userPrincipal), resolvedIncoming(sessionHeader, sessionCookie));
        persistSession(response, userPrincipal, result.sessionId());

        return ApiResponse.success("Item removed", result.response());
    }

    /** Authenticated only — SecurityConfig doesn't permitAll this path, so `principal` is guaranteed non-null here. */
    @PostMapping("/merge")
    public ApiResponse<CartResponse> mergeCart(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CartMergeRequest request
            ){
        CartResponse merged = cartService.mergeGuestCart(userPrincipal.getId(), request.guestSessionId());

        return ApiResponse.success("Cart merged", merged);
    }

    //------helpers-----

    private Long userId(UserPrincipal userPrincipal){
        return userPrincipal != null ? userPrincipal.getId() : null;
    }


    private String resolvedIncoming(String sessionCookie, String sessionHeader){
        return sessionHeader != null ? sessionHeader : sessionCookie;
    }

    /** Only guests get a session id back — logged-in users have nothing to persist client-side. */
    private void persistSession(HttpServletResponse response, UserPrincipal userPrincipal, String sessionId){
        if (userPrincipal != null || sessionId == null)
            return;

        response.setHeader(SESSION_HEADER, sessionId);
        response.addHeader("Set-Cookie",  SESSION_COOKIE + "=" + sessionId+ "; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax");
    }
}
