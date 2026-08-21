package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter.BrandFilter;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter.CategoryFilter;
import com.iqbalitsmy.swoo_tech_mart.entity.Brand;
import com.iqbalitsmy.swoo_tech_mart.entity.Category;
import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlug(String slug);

    boolean existsBySlug(String slug);
    boolean existsBySku(String sku);

    // Retrieves related products from the same category, excluding the current product.
    List<Product> findByCategory_IdAndIdNot(Long categoryId, Long excludeId, Pageable pageable);

    boolean existsByCategory_Id(Long categoryId);

    @Query("""
    select b
    from Product p
    join p.brand b
    group by b
    order by count(p) desc
    """)
    List<Brand> findTopBrands(Pageable pageable);

    // Count products by brand
    int countByBrand_Id(Long brandId);

    Integer countByCategory_Id(Long categoryId);

    // Returns the product with the lowest minPrice — .get().getMinPrice() gives you
    // the catalog's price floor. Used to seed the price slider's lower bound.
    Optional<Product> findFirstByOrderByMinPriceAsc();

    @Query("""
    select c
    from Product p
    join p.category c
    group by c
    order by count(p) desc
    """)
    List<Category> findTopCategories(Pageable pageable);

    List<Product> findAllByOrderBySalesCountDesc(Pageable pageable);

    Optional<Product> findFirstByOrderByMaxPriceDesc(); // was MinPriceDesc — that's the bug

}
