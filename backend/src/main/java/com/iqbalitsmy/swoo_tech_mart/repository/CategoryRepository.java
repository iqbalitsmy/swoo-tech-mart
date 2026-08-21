package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findBySlugIgnoreCase(String slug);
    boolean existsBySlugIgnoreCase(String slug);

    // Returns all top-level (root) categories — those with no parent — sorted alphabetically by name;
    // used to build the main nav/category tree's first level.
    List<Category> findByParentCategoryIsNullOrderByNameAsc();

    // Returns all direct child categories of the given parent category, sorted alphabetically by name; the sibling method to findByParentCategoryIsNullOrderByNameAsc,
    // used to fetch one level of the tree at a time.
    List<Category> findByParentCategory_IdOrderByNameAsc(Long parentId);

    // Checks whether a category has any child categories — use this before deleting/archiving a category to guard against orphaning its subtree.
    boolean existsByParentCategory_Id(Long parentId);

    List<Category> findByParentCategory_SlugIgnoreCaseOrderByNameAsc(String slug);

}
