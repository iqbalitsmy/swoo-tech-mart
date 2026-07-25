package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart_IdOrderByAddedAtAsc(Long cartId);

    Optional<CartItem> findByIdAndCart_Id(Long id, Long cartId);

    Optional<CartItem> findByCart_IdAndProductVariant_Id(Long cartId, Long productVariantId);

    void deleteByCart_Id(Long cartId);
}
