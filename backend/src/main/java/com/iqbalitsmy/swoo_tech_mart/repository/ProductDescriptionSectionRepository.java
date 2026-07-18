package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductDescriptionSection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductDescriptionSectionRepository extends JpaRepository<ProductDescriptionSection, Long> {
    List<ProductDescriptionSection> findByProduct_IdOrderBySortOrderAsc(Long productId);

    Optional<ProductDescriptionSection> findByIdAndProduct_Id(Long id, Long productId);
}
