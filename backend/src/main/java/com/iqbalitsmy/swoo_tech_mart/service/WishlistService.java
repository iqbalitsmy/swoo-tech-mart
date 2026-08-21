package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.WishlistItemResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.WishlistResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.*;
import com.iqbalitsmy.swoo_tech_mart.exception.ConflictException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository; // was ProductVariantRepository
    private final ProductImageRepository productImageRepository;

    private final ProductVariantFactsResolver  productVariantFactsResolver;

    // NOTE: not readOnly — getOrCreateWishlist may INSERT a row on first
    // visit, so this method needs a writable transaction. A read-only tx
    // wrapping a lazy-create is a latent bug even if H2 doesn't enforce it.
    @Transactional
    public WishlistResponse getWishlist(Long userId) {
        Wishlist wishlist = getOrCreateWishlist(userId);

        List<WishlistItem> items = wishlistItemRepository.findByWishlist_IdOrderByAddedAtDesc(wishlist.getId());

        // No variant/fallback two-step needed anymore — a wishlist item IS a
        // product now, so this is just the product's own first gallery image.
        List<Long> productIds = items.stream()
                .map(item -> item.getProduct().getId())
                .distinct()
                .toList();
        Map<Long, String> thumbnails = firstImageByProductId(productIds);
        Map<Long, ProductVariantFactsResolver.VariantFacts> variantFacts = productVariantFactsResolver.resolve(productIds);

        List<WishlistItemResponse> itemResponses = items.stream()
                .map(item -> toResponse(item, thumbnails, variantFacts))
                .toList();

        return new WishlistResponse(wishlist.getId(), itemResponses);
    }

    @Transactional(readOnly = true)
    public boolean isInWishlist(Long userId, Long productId) {
        return wishlistItemRepository.existsByWishlist_User_IdAndProduct_Id(userId, productId);
    }

    @Transactional
    public WishlistItemResponse addItem(Long userId, Long productId) {
        Wishlist wishlist = getOrCreateWishlist(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        if (wishlistItemRepository.existsByWishlist_IdAndProduct_Id(wishlist.getId(), productId)) {
            throw new ConflictException("This product is already in your wishlist");
        }

        WishlistItem wishlistItem = WishlistItem.builder()
                .wishlist(wishlist)
                .product(product)
                .build();

        // Use the saved reference, not the pre-save one — with IDENTITY
        // generation Spring Data mutates the same instance in place so this
        // happens to work either way, but don't rely on that.
        WishlistItem savedItem = wishlistItemRepository.save(wishlistItem);
        Map<Long, ProductVariantFactsResolver.VariantFacts> variantFacts = productVariantFactsResolver.resolve(List.of(productId));

        return toResponse(savedItem, firstImageByProductId(List.of(productId)) , variantFacts);
    }

    /** Idempotent — the heart-icon toggle-off action, so removing something already gone is a no-op, not an error. */
    @Transactional
    public void removeItem(Long userId, Long productId) {
        Wishlist wishlist = getOrCreateWishlist(userId);

        wishlistItemRepository.findByWishlist_IdAndProduct_Id(wishlist.getId(), productId)
                .ifPresent(wishlistItemRepository::delete);
    }

    @Transactional
    public void clearWishlist(Long userId) {
        Wishlist wishlist = getOrCreateWishlist(userId);

        wishlistItemRepository.deleteByWishlist_Id(wishlist.getId());
    }

    // ------ helpers ------

    private WishlistItemResponse toResponse(WishlistItem item,  Map<Long, String> thumbnails, Map<Long, ProductVariantFactsResolver.VariantFacts> variantFacts) {
        Product product = item.getProduct();
        var facts = ProductVariantFactsResolver.factsFor(variantFacts, product.getId());

        ProductSummaryResponse summary = ProductSummaryResponse.fromEntity(product, thumbnails.get(product.getId()), facts.singleVariant(), facts.defaultVariantId());

        return WishlistItemResponse.fromEntity(item, summary);
    }

    private Wishlist getOrCreateWishlist(Long userId) {
        return wishlistRepository.findByUser_Id(userId).orElseGet(() -> {
                    User user = userRepository.getReferenceById(userId);
                    return wishlistRepository.save(Wishlist.builder().user(user).build());
                }
        );
    }

    private Map<Long, String> firstImageByProductId(List<Long> productIds) {
        if (productIds.isEmpty()) return Map.of();

        Map<Long, String> result = new HashMap<>();
        var images = productImageRepository.findByProduct_IdInOrderByProduct_IdAscSortOrderAsc(productIds);

        for (var image : images) {
            result.putIfAbsent(image.getProduct().getId(), image.getUrl());
        }

        return result;
    }
}