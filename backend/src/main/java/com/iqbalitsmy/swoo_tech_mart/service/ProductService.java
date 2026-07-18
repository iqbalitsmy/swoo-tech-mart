package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.*;
import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductDescriptionSection;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductImage;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.StockStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductHighlightRepository productHighlightRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductDescriptionSectionRepository productDescriptionSectionRepository;
    private final ProductDescriptionImageRepository productDescriptionImageRepository;

    // Builds a dynamic Specification from all filter params, paginates, and attaches each product's thumbnail.
    @Transactional(readOnly = true)
    public PageResponse<ProductSummaryResponse> search(
            Long categoryId, Long brandId, String tag,
            BigDecimal minPrice, BigDecimal maxPrice,
            StockStatus stockStatus, Boolean isNew,
            String sort, int page, int size, String q
    ) {
        Specification<Product> spec = Specification
                .where(ProductSpecifications.categoryId(categoryId))
                .and(ProductSpecifications.brandId(brandId))
                .and(ProductSpecifications.tagLabel(tag))
                .and(ProductSpecifications.minPriceAtLeast(minPrice))
                .and(ProductSpecifications.maxPriceAtMost(maxPrice))
                .and(ProductSpecifications.stockStatus(stockStatus))
                .and(ProductSpecifications.isNew(isNew))
                .and(ProductSpecifications.searchText(q));

        Pageable pageable = PageRequest.of(Math.max(page, 0), clampSize(size), resolveSort(sort));
        Page<Product> result = productRepository.findAll(spec, pageable);

        Map<Long, String> thumbnails = firstImageByProductId(
                result.getContent().stream().map(Product::getId).toList()
        );

        Page<ProductSummaryResponse> mapped = result.map(p ->
                ProductSummaryResponse.fromEntity(p, thumbnails.get(p.getId())));

        return PageResponse.from(mapped);
    }

    // Loads the full product detail view (images, highlights, variants) by its SEO slug, 404s if not found.
    @Transactional(readOnly = true)
    public ProductDetailResponse getBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + slug));
        return toDetailResponse(product);
    }

    // Finds up to `limit` other products in the same category as the given product, newest first, excluding itself.
    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> getRelated(Long productId, int limit) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        if (product.getCategory() == null) {
            return List.of();
        }

        Pageable pageable = PageRequest.of(0, Math.min(Math.max(limit, 1), 24), Sort.by(Sort.Direction.DESC, "createdAt"));
        List<Product> related = productRepository.findByCategory_IdAndIdNot(
                product.getCategory().getId(), productId, pageable);

        Map<Long, String> thumbnails = firstImageByProductId(related.stream().map(Product::getId).toList());

        return related.stream()
                .map(p -> ProductSummaryResponse.fromEntity(p, thumbnails.get(p.getId())))
                .toList();
    }

    // Returns the product's description broken into ordered sections, each with its own ordered images.
    @Transactional(readOnly = true)
    public List<ProductDescriptionSectionResponse> getDescription(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        List<ProductDescriptionSection> sections =
                productDescriptionSectionRepository.findByProduct_IdOrderBySortOrderAsc(productId);

        return sections.stream()
                .map(section -> ProductDescriptionSectionResponse.fromEntity(section, imagesFor(section.getId())))
                .toList();
    }

    // Fetches the ordered images belonging to a single description section.
    private List<ProductDescriptionImageResponse> imagesFor(Long sectionId) {
        return productDescriptionImageRepository
                .findByProductDescriptionSection_IdOrderBySortOrderAsc(sectionId).stream()
                .map(ProductDescriptionImageResponse::fromEntity)
                .toList();
    }

    // ---- shared helpers (also used by ProductAdminService) ----
    // Assembles a full ProductDetailResponse by pulling and mapping a product's images, highlights, and variants.
    ProductDetailResponse toDetailResponse(Product product) {
        List<ProductImageResponse> images = productImageRepository
                .findByProduct_IdOrderBySortOrderAsc(product.getId()).stream()
                .map(ProductImageResponse::fromEntity)
                .toList();

        List<ProductHighlightResponse> highlights = productHighlightRepository
                .findByProduct_IdOrderBySortOrderAsc(product.getId()).stream()
                .map(ProductHighlightResponse::fromEntity)
                .toList();

        List<ProductVariantSummaryResponse> variants = productVariantRepository
                .findByProduct_Id(product.getId()).stream()
                .map(ProductVariantSummaryResponse::fromEntity)
                .toList();

        return ProductDetailResponse.fromEntity(product, images, highlights, variants);
    }

    // Batch-fetches each product's first (sort-order-lowest) image URL, avoiding an N+1 query for list views.
    private Map<Long, String> firstImageByProductId(List<Long> productIds) {
        if (productIds.isEmpty()) return Map.of();

        Map<Long, String> result = new LinkedHashMap<>();
        for (ProductImage image : productImageRepository.findByProduct_IdInOrderByProduct_IdAscSortOrderAsc(productIds)) {
            result.putIfAbsent(image.getProduct().getId(), image.getUrl());
        }
        return result;
    }

    // Translates a sort keyword (e.g. "price_asc") into a Sort object, defaulting to newest-first.
    private Sort resolveSort(String sort) {
        if (!StringUtils.hasText(sort)) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }
        return switch (sort) {
            case "price_asc" -> Sort.by(Sort.Direction.ASC, "minPrice");
            case "price_desc" -> Sort.by(Sort.Direction.DESC, "maxPrice");
            case "title_asc" -> Sort.by(Sort.Direction.ASC, "title");
            case "newest" -> Sort.by(Sort.Direction.DESC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    // Guards page size against non-positive or excessively large values (defaults to 20, caps at 100).
    private int clampSize(int size) {
        if (size <= 0) return 20;
        return Math.min(size, 100);
    }
}