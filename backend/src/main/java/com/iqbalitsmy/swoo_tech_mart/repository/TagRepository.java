package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Tag;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag,Long> {
    Optional<Tag> findByLabelIgnoreCase(String label);

    List<Tag> findAllByOrderByLabelAsc();

    // Deletes all rows from the product_tags join table for the specified tag.
    @Modifying
    @Transactional
    @Query(value = "delete from product_tags where tag_id = :tagId", nativeQuery = true)
    void deleteProductTagLinks(@Param("tagId") Long tagId);
}
