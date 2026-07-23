package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.VariantAttributeRef;
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
    private final ProductVariantRepository  productVariantRepository;
    private final ProductImageRepository  productImageRepository;

    @Transactional
    public WishlistResponse getWishlist(Long userId){
        Wishlist wishlist = getOrCreateWishlist(userId);

        List<WishlistItem> items = wishlistItemRepository.findByWishlist_IdOrderByAddedAtDesc(wishlist.getId());

        List<Long> productIdNeedToFallback = items.stream()
                .map(WishlistItem::getProductVariant)
                .filter(v -> v.getImageUrl() == null)
                .map(v -> v.getProduct().getId())
                .distinct()
                .toList();
        Map<Long, String> productFallbackThumbnails = firstImageByProductId(productIdNeedToFallback);

        List<WishlistItemResponse> itemsResponses = items.stream()
                .map(item -> toResponse(item, productFallbackThumbnails))
                .toList();

        return new WishlistResponse(wishlist.getId(), itemsResponses);
    }

    @Transactional
    public WishlistItemResponse addItem(Long userId, Long productVariantId){
        Wishlist wishlist = getOrCreateWishlist(userId);

        ProductVariant variant = productVariantRepository.findById(productVariantId).orElseThrow(() -> new ResourceNotFoundException("product variant not found"));

        if (wishlistItemRepository.existsByWishlist_IdAndProductVariant_Id(wishlist.getId(), productVariantId)) {
            throw new ConflictException("product variant not found");
        }

        WishlistItem wishlistItem = WishlistItem.builder()
                .wishlist(wishlist)
                .productVariant(variant)
                .build();

        WishlistItem savedItem = wishlistItemRepository.save(wishlistItem);

        Map<Long, String> fallback = variant.getImageUrl() == null ? firstImageByProductId(List.of(variant.getProduct().getId()))
                : Map.of();

        return toResponse(wishlistItem, fallback);
    }

    @Transactional
    public void removeItem(Long userId, Long productVariantId){
        Wishlist wishlist = getOrCreateWishlist(userId);

        wishlistItemRepository.findByWishlist_IdAndProductVariant_Id(wishlist.getId(), productVariantId)
                .ifPresent(wishlistItemRepository::delete);
    }

    @Transactional
    public void clearWishlist(Long userId){
        Wishlist wishlist = getOrCreateWishlist(userId);

        wishlistItemRepository.deleteByWishlist_Id(wishlist.getId());
    }


    //------helpers------

    private WishlistItemResponse toResponse(WishlistItem item, Map<Long, String> productFallbackThumbnails) {
        ProductVariant variant = item.getProductVariant();

        List<VariantAttributeRef> attributes = variant.getAttributeValues().stream()
                .map(VariantAttributeRef::fromEntity)
                .toList();

        String imageUrl = variant.getImageUrl() != null ? variant.getImageUrl() : productFallbackThumbnails.get(variant.getProduct().getId());

        return WishlistItemResponse.fromEntity(item, attributes, imageUrl);
    }

    private Wishlist getOrCreateWishlist(Long userId){
        return wishlistRepository.findByUser_Id(userId).orElseGet( () -> {
                    User user = userRepository.getReferenceById(userId);
                    return wishlistRepository.save(Wishlist.builder().user(user).build());
                }
        );
    }

    /** Fallback thumbnail for variants that don't carry their own imageUrl — first product gallery image. */
    private Map<Long, String> firstImageByProductId(List<Long> productId){
        if (productId.isEmpty()) return Map.of();

        Map<Long, String> result = new HashMap<Long, String>();
        var images = productImageRepository.findByProduct_IdInOrderByProduct_IdAscSortOrderAsc(productId);

        for (var image : images){
            result.putIfAbsent(image.getProduct().getId(), image.getUrl());
        }

        return result;
    }
}
