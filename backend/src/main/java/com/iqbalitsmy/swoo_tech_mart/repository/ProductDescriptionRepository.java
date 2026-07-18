package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductDescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductDescriptionRepository extends JpaRepository<ProductDescription,Long> {
    Optional<ProductDescription> findByProduct_Id(Long productDescriptionId);
}
