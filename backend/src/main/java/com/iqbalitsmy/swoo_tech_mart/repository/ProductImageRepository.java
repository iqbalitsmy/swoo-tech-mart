package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
    List<ProductImage> findByProduct_IdOrderBySortOrderAsc(Long productId);

    Optional<ProductImage> findByIdAndProduct_Id(Long id, Long productId);

    List<ProductImage> findByProduct_IdInOrderByProduct_IdAscSortOrderAsc(List<Long> productIds);
}
