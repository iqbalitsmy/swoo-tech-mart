package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductHighlight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductHighlightRepository extends JpaRepository<ProductHighlight,Long> {
    List<ProductHighlight> findByProduct_IdOrderBySortOrderAsc(Long productId);

    Optional<ProductHighlight> findByIdAndProduct_Id(Long id, Long productId);
}
