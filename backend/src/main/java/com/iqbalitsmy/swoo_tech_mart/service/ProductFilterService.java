package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter.*;
import com.iqbalitsmy.swoo_tech_mart.entity.Category;
import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductFilterService {
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ReviewRepository reviewRepository;
    private final AttributeValueRepository attributeValueRepository;

    private static final int[] RATING_LEVELS = {5, 4, 3, 2};
    private static final int TOP_CATEGORIES = 12;
    private static final int TOP_BRANDS = 6;

    public ProductFilterResponse getProductFilters(String slug) {


        return new ProductFilterResponse(
                buildCategories(slug),
                buildBrands(),
                buildPriceRanges(),
                buildRatings(),
                buildAttributeValues("Color"),
                buildAttributeValues("Memory")
        );
    }

    private CategoryFilterSection buildCategories(String slug) {
        if (slug == null || slug.isBlank()) {
            List<Category> topCategories = productRepository.findTopCategories(PageRequest.of(0, TOP_CATEGORIES));
            List<CategoryFilter> categoryFilters = topCategories.stream()
                    .map(CategoryFilter::fromEntity)
                    .toList();
            return new CategoryFilterSection(null, categoryFilters);
        }

        // findBySlugIgnoreCase already exists on your CategoryRepository —
        // reused here to fetch the parent's own name/id/slug, separate from
        // the query that fetches its children.
        CategoryFilter parent = categoryRepository.findBySlugIgnoreCase(slug)
                .map(CategoryFilter::fromEntity)
                .orElse(null);

        List<Category> children = categoryRepository.findByParentCategory_SlugIgnoreCaseOrderByNameAsc(slug);
        List<CategoryFilter> categoryFilters = children.stream()
                .map(CategoryFilter::fromEntity)
                .toList();

        return new CategoryFilterSection(parent, categoryFilters);
    }

    private List<BrandFilter> buildBrands() {

        return productRepository.findTopBrands(PageRequest.of(0, TOP_BRANDS)).stream()
                .map(b -> BrandFilter.fromEntity(b, productRepository.countByBrand_Id(b.getId())))
                .toList();
    }

    private PriceRangeFilter buildPriceRanges() {
        BigDecimal lowestPrice = productRepository.findFirstByOrderByMinPriceAsc()
                .map(Product::getMinPrice)
                .orElse(BigDecimal.ZERO);

        BigDecimal highestPrice = productRepository.findFirstByOrderByMaxPriceDesc()
                .map(Product::getMinPrice)
                .orElse(BigDecimal.ZERO);
        return new PriceRangeFilter("Price range", lowestPrice, highestPrice);
    }

    private List<RatingFilter> buildRatings() {
        return java.util.Arrays.stream(RATING_LEVELS)
                .mapToObj(level -> new  RatingFilter(level, reviewRepository.countProductsWithAverageRatingAtLeast(level)))
                .collect(Collectors.toList());
    }

    private List<AttributeFilterValue> buildAttributeValues(String attributeTypeName) {
        return attributeValueRepository.findByAttributeType_NameIgnoreCase(attributeTypeName).stream()
                .map(av -> new AttributeFilterValue(av.getId(), av.getLabel(), av.getValue(), productVariantRepository.countByAttributeValues_Id(av.getId())))
                .collect(Collectors.toList());
    }
}
