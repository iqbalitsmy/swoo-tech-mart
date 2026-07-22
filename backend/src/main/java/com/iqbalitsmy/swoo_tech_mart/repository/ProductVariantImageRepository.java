package com.iqbalitsmy.swoo_tech_mart.repository;


import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariantImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductVariantImageRepository extends JpaRepository<ProductVariantImage,Long> {

    List<ProductVariantImage> findByProductVariant_IdOrderBySortOrderAsc(Long productVariantId);

    Optional<ProductVariantImage> findByIdAndProductVariant_Id(Long id, Long productVariantId);
}
