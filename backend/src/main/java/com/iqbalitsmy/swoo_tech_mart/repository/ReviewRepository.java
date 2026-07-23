package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByProduct_Id(Long id, Pageable pageable);

    boolean existsByProduct_IdAndUser_Id(Long productId, Long userId);

    long countByProduct_Id(Long productId);

    @Query("select coalesce(avg(r.rating), 0) from Review r where r.product.id = :productId")       //COALESCE is a function that returns the first non-NULL value from a list of expressions.
    double averageRatingForProduct(@Param("productId") Long productId);
}
