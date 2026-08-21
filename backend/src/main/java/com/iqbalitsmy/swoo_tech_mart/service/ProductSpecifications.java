package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.Tag;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.StockStatus;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.List;

/**
 * One Specification per query param on GET /api/products. ProductService
 * combines whichever of these apply for a given request — params that
 * weren't sent produce a Specification.where(null) equivalent.
 */
public class ProductSpecifications {

    private ProductSpecifications(){}

//    static Specification<Product> categoryId(Long categoryId){
////        if(categoryId == null) return null;
//        if (categoryId == null) {
//            return (root, query, cb) -> cb.conjunction();
//        }
//        return (root, query, cb) -> cb.equal(root.get("category").get("id"), categoryId);
//    }

//    static Specification<Product> categorySlug(String slug){
////        if (!StringUtils.hasText(slug)) return null;
//        if (!StringUtils.hasText(slug)) {
//            return (root, query, cb) -> cb.conjunction();
//        }
//        return (root, query, cb) -> cb.equal(root.get("category").get("slug"), slug);
//    }

    static Specification<Product> categorySlug(String categorySlug, CategoryService categoryService){
//        if (!StringUtils.hasText(slug)) return null;
        if (!StringUtils.hasText(categorySlug)) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> {
            List<Long> categoryIds = categoryService.resolveCategoryIds(categorySlug);
            return root.get("category").get("id").in(categoryIds);
        };
    }

//    static Specification<Product> brandId(Long brandId){
////        if(brandId == null) return null;
//        if(brandId == null) {
//            return (root, query, cb) -> cb.conjunction();
//        }
//        return (root, query, cb) -> cb.equal(root.get("brand").get("id"), brandId);
//    }

    static Specification<Product> brandSlug(String slug){
//        if (!StringUtils.hasText(slug)) return null;
        if (!StringUtils.hasText(slug)) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.equal(root.get("brand").get("slug"), slug);
    }

    static Specification<Product> tagLabel(String tag){
//        if (!StringUtils.hasText(tag)) return null;
        if (!StringUtils.hasText(tag)) {
            return (root, query, cb) -> cb.conjunction();
        }

        return (root, query, cb) -> {
            query.distinct(true);
            Join<Product, Tag> tags = root.join("tags", JoinType.INNER);

            return cb.equal(cb.lower(tags.get("label")), tag.trim().toLowerCase());
        };
    }

    static Specification<Product> minPriceAtLeast(BigDecimal minPrice){
//        if (minPrice == null) return null;
        if (minPrice == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return ((root, query, criteriaBuilder) ->  criteriaBuilder.greaterThan(root.get("minPrice"), minPrice));
    }

    static Specification<Product> maxPriceAtMost(BigDecimal maxPrice){
//        if (maxPrice == null) return null;
        if (maxPrice == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return ((root, query, criteriaBuilder) ->  criteriaBuilder.greaterThan(root.get("maxPrice"), maxPrice));
    }

    static Specification<Product> stockStatus(StockStatus stockStatus){
//        if (stockStatus == null) return null;
        if (stockStatus == null) {
            return (root, query, cb) -> cb.conjunction();
        }
        return (root, query, cb) -> cb.equal(root.get("stockStatus"), stockStatus);
    }

    static Specification<Product> isNew(Boolean isNew){
//        if(isNew == null) return null;
        if(isNew == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return (root, query, cb) -> cb.equal(root.get("isNew"), isNew);
    }
    //% means any number of characters.
    static Specification<Product> searchText(String q){
//        if (!StringUtils.hasText(q)) return null;
        if (!StringUtils.hasText(q)) {
            return (root, query, cb) -> cb.conjunction();
        }

        String like = "%"+q.trim().toLowerCase()+"%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("title")), like),
                cb.like(cb.lower(root.get("sku")), like)
        );
    }
}
