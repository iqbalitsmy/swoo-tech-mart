package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.RecentlyViewedProduct;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecentlyViewedProductRepository extends JpaRepository<RecentlyViewedProduct, Long> {
    Optional<RecentlyViewedProduct> findByUserIdAndProduct_Id(Long userId, Long productId);

    Optional<RecentlyViewedProduct> findBySessionIdAndProduct_Id(String sessionId, Long productId);

    // ---- listing, most-recent first, capped via Pageable ----
    List<RecentlyViewedProduct> findByUserIdOrderByViewedAtDesc(Long userId, Pageable pageable);

    List<RecentlyViewedProduct> findBySessionIdOrderByViewedAtDesc(String sessionId, Pageable pageable);

    // ---- full ascending list, used only to find/trim the oldest rows past the history cap ----
    List<RecentlyViewedProduct> findByUserIdOrderByViewedAtAsc(Long userId);

    List<RecentlyViewedProduct> findBySessionIdOrderByViewedAtAsc(String sessionId);

    long countByUserId(Long userId);

    long countBySessionId(String sessionId);

    // single item removal
    void deleteByUserIdAndProduct_Id(Long userId, Long productId);

    void deleteBySessionIdAndProduct_Id(String sessionId, Long productId);

    // clear all
    void deleteByUserId(Long userId);
    void deleteBySessionId(String sessionId);
}
