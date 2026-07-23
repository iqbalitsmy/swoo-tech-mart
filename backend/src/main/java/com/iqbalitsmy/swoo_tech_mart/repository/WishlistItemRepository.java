package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByWishlist_IdOrderByAddedAtDesc(Long wishlistId);

    Optional<WishlistItem> findByWishlist_IdAndProductVariant_Id(Long wishlistId, Long productVariantId);
    boolean existsByWishlist_IdAndProductVariant_Id(Long wishlistId, Long productVariantId);

    void deleteByWishlist_Id(Long wishlistId);
}
