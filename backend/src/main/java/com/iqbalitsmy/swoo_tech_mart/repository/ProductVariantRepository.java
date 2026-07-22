package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Brand;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant,Long> {

    List<ProductVariant> findByProduct_Id(Long product_id);

    List<ProductVariant> findByProduct_IdOrderByIdAsc(Long product_id);

    boolean existsBySku(String sku);

    boolean existsByAttributeValues_Id(Long attributeValues_id);
}
