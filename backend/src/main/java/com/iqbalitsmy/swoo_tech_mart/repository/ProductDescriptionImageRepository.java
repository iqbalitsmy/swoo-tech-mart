package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductDescriptionImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductDescriptionImageRepository extends JpaRepository<ProductDescriptionImage,Long> {
    List<ProductDescriptionImage> findByProductDescriptionSection_IdOrderBySortOrderAsc(Long productDescriptionId);

    Optional<ProductDescriptionImage> findByIdAndProductDescriptionSection_Id(Long id, Long productDescriptionId);
}
