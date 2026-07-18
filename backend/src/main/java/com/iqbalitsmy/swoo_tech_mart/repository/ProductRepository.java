package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlug(String slug);
    boolean existsBySlug(String slug);
    boolean existsBySku(String sku);

    List<Product> findByCategory_IdAndIdNot(Long categoryId, Long excludeId, Pageable pageable);
}
