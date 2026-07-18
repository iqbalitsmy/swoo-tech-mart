package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand,Long> {
    Optional<Brand> findBySlugIgnoreCase(String slug);

    boolean existsBySlugIgnoreCase(String slug);

    // Case-insensitive partial-name search across brands (e.g. admin autocomplete/typeahead), sorted alphabetically.
    List<Brand> findByNameContainingIgnoreCaseOrderByNameAsc(String search);

    // Returns every brand sorted alphabetically by name — used to populate the full brand filter list.
    List<Brand> findAllByOrderByNameAsc(String name);

    // Bulk-nulls the brand reference on all products belonging to a brand, ahead of deleting that brand (avoids FK violations).
    @Modifying
    @Transactional
    @Query("update Product p set p.brand = null where p.brand.id = :brandId")
    void detachFromProduct(@Param("brandId") Long brandId);
}
