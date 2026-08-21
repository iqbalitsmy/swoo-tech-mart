package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {

    List<WishlistItem> findByWishlist_IdOrderByAddedAtDesc(Long wishlistId);

    Optional<WishlistItem> findByWishlist_IdAndProduct_Id(Long wishlistId, Long productId);

    boolean existsByWishlist_IdAndProduct_Id(Long wishlistId, Long productId);

    boolean existsByWishlist_User_IdAndProduct_Id(Long userId, Long productId);

    void deleteByWishlist_Id(Long wishlistId);
}