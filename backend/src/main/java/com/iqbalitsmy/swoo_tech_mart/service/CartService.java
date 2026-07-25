package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CartItemAddRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.CartItemUpdateRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CartItemResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CartResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.VariantAttributeRef;
import com.iqbalitsmy.swoo_tech_mart.entity.Cart;
import com.iqbalitsmy.swoo_tech_mart.entity.CartItem;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductImageRepository productImageRepository;

    //----reads-----

    @Transactional
    public CartResult getCart(Long userId, String incomingSessionId) {
        CartResolution resolution = resolveCart(userId, incomingSessionId);

        return new CartResult(buildResponse(resolution.cart()), resolution.sessionId());
    }

    //---writes-----

    @Transactional
    public CartResult addItem(Long userId, String incomingSessionId, CartItemAddRequest request) {
        CartResolution resolution = resolveCart(userId, incomingSessionId);

        Cart cart = resolution.cart();

        ProductVariant variant = productVariantRepository.findById(request.variantId())
                .orElseThrow(() -> new ResourceNotFoundException("variant not found with id: " + request.variantId()));

        if (!variant.getProduct().getId().equals(request.productId())) {
            throw  new ResourceNotFoundException("This variant does not belong to product " + request.productId());
        }

        CartItem existing = cartItemRepository.findByCart_IdAndProductVariant_Id(cart.getId(), variant.getId()).orElse(null);

        if (existing != null) {
            int newQuantity = existing.getQuantity() + request.quantity();
            assertStock(variant, newQuantity);
            existing.setQuantity(newQuantity);
            cartItemRepository.save(existing);
        } else {
            assertStock(variant, request.quantity());
            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .productVariant(variant)
                    .quantity(request.quantity())
                    .unitPriceSnapshot(variant.getPrice())
                    .build();

            cartItemRepository.save(cartItem);
        }

        return new CartResult(buildResponse(cart), resolution.sessionId());
    }

    @Transactional
    public CartResult updateItemQuantity(Long userId, String incomingSessionId, Long itemId, CartItemUpdateRequest request) {
        CartResolution resolution = resolveCart(userId, incomingSessionId);
        Cart cart = resolution.cart();

        CartItem item = cartItemRepository.findByIdAndCart_Id(itemId, cart.getId()).orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + itemId));

        assertStock(item.getProductVariant(), request.quantity());
        item.setQuantity(request.quantity());
        cartItemRepository.save(item);

        return new CartResult(buildResponse(cart), resolution.sessionId());
    }

    @Transactional
    public CartResult removeItem(Long userId, String incomingSessionId, Long itemId) {
        CartResolution resolution = resolveCart(userId, incomingSessionId);

        Cart cart = resolution.cart();

        cartItemRepository.findByIdAndCart_Id(itemId, cart.getId())
                .ifPresent(cartItemRepository::delete);

        return new CartResult(buildResponse(cart), resolution.sessionId());
    }

    @Transactional
    public CartResult clearCart(Long userId, String incomingSessionId) {
        CartResolution resolution = resolveCart(userId, incomingSessionId);
        cartItemRepository.deleteByCart_Id(resolution.cart().getId());

        return new CartResult(buildResponse(resolution.cart()), resolution.sessionId());
    }

    @Transactional
    public CartResponse mergeGuestCart(Long userId, String guestSessionId) {
        Cart userCart = resolveCart(userId, null).cart();

        Cart guestCart = cartRepository.findBySessionId(guestSessionId).orElse(null);

        if (guestCart == null || guestCart.getId().equals(userCart.getId())) {
            return buildResponse(userCart);
        }

        for (CartItem guestItem : cartItemRepository.findByCart_IdOrderByAddedAtAsc(guestCart.getId())) {
            ProductVariant variant = guestItem.getProductVariant();

            CartItem existing = cartItemRepository
                    .findByCart_IdAndProductVariant_Id(userCart.getId(), variant.getId())
                    .orElse(null);

            if (existing != null) {
                int combined = Math.min(existing.getQuantity() + guestItem.getQuantity(), variant.getStockQty());
                existing.setQuantity(Math.max(combined, 1));
                cartItemRepository.save(existing);
            } else {
                int quantity = Math.min(guestItem.getQuantity(), Math.max(variant.getStockQty(), 0));
                if (quantity > 0) {
                    CartItem moved = CartItem.builder()
                            .cart(userCart)
                            .productVariant(variant)
                            .quantity(quantity)
                            .unitPriceSnapshot(variant.getPrice())
                            .build();
                    cartItemRepository.save(moved);
                }
            }
        }

        cartItemRepository.deleteByCart_Id(guestCart.getId());
        cartRepository.delete(guestCart);

        return buildResponse(userCart);
    }

    //----helpers------

    /**
     * Logged-in user (userId != null): find-or-create their cart, no
     * session id involved. Guest (userId == null): find-or-create by
     * sessionId, generating a fresh UUID if the caller didn't send one yet
     * (their very first cart interaction) — the returned sessionId is
     * always populated for guests so the controller can (re)persist it.
     */
    private CartResolution resolveCart(Long userId, String incomingSessionId) {
        if (userId != null) {
            Cart cart = cartRepository.findByUser_Id(userId)
                    .orElseGet(() -> {
                        User user = userRepository.getReferenceById(userId);
                        return cartRepository.save(Cart.builder().user(user).build());
                    });
            return new CartResolution(cart, null);
        }

        String sessionId = (incomingSessionId != null && !incomingSessionId.isBlank()) ? incomingSessionId : UUID.randomUUID().toString();

        Cart cart = cartRepository.findBySessionId(sessionId)
                .orElseGet(() -> cartRepository.save(Cart.builder().sessionId(sessionId).build()));

        return new CartResolution(cart, sessionId);
    }


    private void assertStock(ProductVariant variant, int requestQuantity) {
        if (!variant.getActive()) {
            throw  new BadRequestException("This item is no longer available");
        }
        if (requestQuantity > variant.getStockQty()){
            throw new  BadRequestException("Only " + variant.getStockQty() + " left in stock for this item");
        }
    }

    private CartResponse buildResponse(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCart_IdOrderByAddedAtAsc(cart.getId());

        List<Long> fallBackProductId = items.stream()
                .map(CartItem::getProductVariant)
                .filter(v -> v.getImageUrl() == null)
                .map(v -> v.getProduct().getId())
                .distinct()
                .toList();

        Map<Long, String> fallBackThumbnail = firstImageByProductId(fallBackProductId);

        List<CartItemResponse> itemResponse = items.stream()
                .map(
                        item -> {
                            ProductVariant variant = item.getProductVariant();
                            List<VariantAttributeRef> attributes = variant.getAttributeValues().stream()
                                    .map(VariantAttributeRef::fromEntity)
                                    .toList();

                            String imageUrl = variant.getImageUrl() != null ? variant.getImageUrl() : fallBackThumbnail.get(variant.getId());

                            return CartItemResponse.fromEntity(item, attributes, imageUrl);
                        }
                ).toList();

        BigDecimal subtotal = itemResponse.stream()
                .map(CartItemResponse::lineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartResponse(cart.getId(), itemResponse, subtotal);
    }

    private Map<Long, String> firstImageByProductId(List<Long> productIds) {
        if (productIds.isEmpty()) return Map.of();

        Map<Long, String> result = new LinkedHashMap<>();

        for (var image : productImageRepository.findByProduct_IdInOrderByProduct_IdAscSortOrderAsc(productIds)) {
            result.putIfAbsent(image.getProduct().getId(), image.getUrl());
        }
        return result;
    }
}
