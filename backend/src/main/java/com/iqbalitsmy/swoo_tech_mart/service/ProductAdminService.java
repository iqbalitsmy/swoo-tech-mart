package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.*;
import com.iqbalitsmy.swoo_tech_mart.dto.response.*;
import com.iqbalitsmy.swoo_tech_mart.entity.*;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductAdminService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final TagRepository tagRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductHighlightRepository productHighlightRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductDescriptionSectionRepository productDescriptionSectionRepository;
    private final ProductDescriptionImageRepository productDescriptionImageRepository;
    private final ProductService productService; // reused for the shared toDetailResponse() assembly

    // ---- Product ----
    // Creates a new product after checking SKU/slug uniqueness, resolving category/brand/tags by reference.
    @Transactional
    public ProductDetailResponse createProduct(ProductRequest request) {
        if (productRepository.existsBySku(request.sku())) {
            throw new BadRequestException("A product with this SKU already exists");
        }
        if (productRepository.existsBySlug(request.slug())) {
            throw new BadRequestException("A product with this slug already exists");
        }

        Product product = Product.builder()
                .sku(request.sku())
                .title(request.title())
                .slug(request.slug())
                .category(request.categoryId() != null ? categoryRepository.getReferenceById(request.categoryId()) : null)
                .brand(request.brandId() != null ? brandRepository.getReferenceById(request.brandId()) : null)
                .stockStatus(request.stockStatus())
                .isNew(Boolean.TRUE.equals(request.isNew()))
                .tags(resolveTags(request.tagIds()))
                .build();

        Product saved = productRepository.save(product);
        return productService.toDetailResponse(saved);
    }

    // Overwrites an existing product's fields, re-checking SKU/slug uniqueness only if either value actually changed.
    @Transactional
    public ProductDetailResponse updateProduct(Long productId, ProductRequest request) {
        Product product = findProductOrThrow(productId);

        if (!product.getSku().equals(request.sku()) && productRepository.existsBySku(request.sku())) {
            throw new BadRequestException("A product with this SKU already exists");
        }
        if (!product.getSlug().equals(request.slug()) && productRepository.existsBySlug(request.slug())) {
            throw new BadRequestException("A product with this slug already exists");
        }

        product.setSku(request.sku());
        product.setTitle(request.title());
        product.setSlug(request.slug());
        product.setCategory(request.categoryId() != null ? categoryRepository.getReferenceById(request.categoryId()) : null);
        product.setBrand(request.brandId() != null ? brandRepository.getReferenceById(request.brandId()) : null);
        product.setStockStatus(request.stockStatus());
        product.setNew(Boolean.TRUE.equals(request.isNew()));
        product.setTags(resolveTags(request.tagIds()));

        return productService.toDetailResponse(productRepository.save(product));
    }

    /**
     * Hard delete. The ER diagram doesn't carry an "archived"/"active" flag on
     * Product, so there's no soft-delete state to flip — if you want archiving
     * instead of removal later, add that column and switch this to a status
     * update. No cascade is configured on the child tables, so they're
     * cleaned up explicitly here, in dependency order, before the product row.
     */

    // Manually cascades deletion through tags, description sections/images, images, highlights, and variants before removing the product itself.
    @Transactional
    public void deleteProduct(Long productId) {
        Product product = findProductOrThrow(productId);

        product.getTags().clear();
        productRepository.save(product); // flush the product_tags join-table rows first

        for (ProductDescriptionSection section : productDescriptionSectionRepository.findByProduct_IdOrderBySortOrderAsc(productId)) {
            productDescriptionImageRepository.deleteAll(
                    productDescriptionImageRepository.findByProductDescriptionSection_IdOrderBySortOrderAsc(section.getId()));
        }
        productDescriptionSectionRepository.deleteAll(
                productDescriptionSectionRepository.findByProduct_IdOrderBySortOrderAsc(productId));

        productImageRepository.deleteAll(productImageRepository.findByProduct_IdOrderBySortOrderAsc(productId));
        productHighlightRepository.deleteAll(productHighlightRepository.findByProduct_IdOrderBySortOrderAsc(productId));
        productVariantRepository.deleteAll(productVariantRepository.findByProduct_Id(productId));

        productRepository.delete(product);
    }

    // ---- Images ----
    // Adds a new image to the product at the given sort order (defaults to 0 / first if not specified).
    @Transactional
    public ProductImageResponse addImage(Long productId, ProductImageRequest request) {
        Product product = findProductOrThrow(productId);

        ProductImage image = ProductImage.builder()
                .product(product)
                .url(request.url())
                .sortOrder(request.sortOrder() != null ? request.sortOrder() : 0)
                .build();

        return ProductImageResponse.fromEntity(productImageRepository.save(image));
    }

    // Deletes an image, scoping the lookup to the given product so you can't delete another product's image by ID.
    @Transactional
    public void deleteImage(Long productId, Long imageId) {
        ProductImage image = productImageRepository.findByIdAndProduct_Id(imageId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found with id: " + imageId));
        productImageRepository.delete(image);
    }

    // Bulk-updates sort order for a set of {imageId, sortOrder} pairs, validating each image belongs to the product, then returns the new order.
    @Transactional
    public List<ProductImageResponse> reorderImages(Long productId, List<ImageReorderItemRequest> items) {
        findProductOrThrow(productId); // 404s early if the product itself doesn't exist

        if (items == null || items.isEmpty()) {
            throw new BadRequestException("At least one {imageId, sortOrder} item is required");
        }

        for (ImageReorderItemRequest item : items) {
            ProductImage image = productImageRepository.findByIdAndProduct_Id(item.imageId(), productId)
                    .orElseThrow(() -> new BadRequestException(
                            "Image id " + item.imageId() + " does not belong to product " + productId));
            image.setSortOrder(item.sortOrder());
            productImageRepository.save(image);
        }

        return productImageRepository.findByProduct_IdOrderBySortOrderAsc(productId).stream()
                .map(ProductImageResponse::fromEntity)
                .toList();
    }

    // ---- Highlights ----
    // Adds a new highlight/feature bullet to the product at the given sort order (defaults to 0).
    @Transactional
    public ProductHighlightResponse addHighlight(Long productId, ProductHighlightRequest request) {
        Product product = findProductOrThrow(productId);

        ProductHighlight highlight = ProductHighlight.builder()
                .product(product)
                .text(request.text())
                .sortOrder(request.sortOrder() != null ? request.sortOrder() : 0)
                .build();

        return ProductHighlightResponse.fromEntity(productHighlightRepository.save(highlight));
    }

    // Deletes a highlight, scoping the lookup to the given product so you can't delete another product's highlight by ID.
    @Transactional
    public void deleteHighlight(Long productId, Long highlightId) {
        ProductHighlight highlight = productHighlightRepository.findByIdAndProduct_Id(highlightId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Highlight not found with id: " + highlightId));
        productHighlightRepository.delete(highlight);
    }

    // ---- Description sections (a product can have any number, each independently titled) ----

    // Creates a new (initially image-less) description section on the product.
    @Transactional
    public ProductDescriptionSectionResponse addSection(Long productId, ProductDescriptionSectionRequest request) {
        Product product = findProductOrThrow(productId);

        ProductDescriptionSection section = ProductDescriptionSection.builder()
                .product(product)
                .title(request.title())
                .body(request.body())
                .sortOrder(request.sortOrder() != null ? request.sortOrder() : 0)
                .build();

        ProductDescriptionSection saved = productDescriptionSectionRepository.save(section);
        return ProductDescriptionSectionResponse.fromEntity(saved, List.of());
    }

    // Updates a section's title/body (and sort order if provided), then re-attaches its existing images in the response.
    @Transactional
    public ProductDescriptionSectionResponse updateSection(Long productId, Long sectionId,
                                                           ProductDescriptionSectionRequest request) {
        ProductDescriptionSection section = findSectionOrThrow(productId, sectionId);

        section.setTitle(request.title());
        section.setBody(request.body());
        if (request.sortOrder() != null) {
            section.setSortOrder(request.sortOrder());
        }

        ProductDescriptionSection saved = productDescriptionSectionRepository.save(section);
        List<ProductDescriptionImageResponse> images = productDescriptionImageRepository
                .findByProductDescriptionSection_IdOrderBySortOrderAsc(saved.getId()).stream()
                .map(ProductDescriptionImageResponse::fromEntity)
                .toList();

        return ProductDescriptionSectionResponse.fromEntity(saved, images);
    }

    // Deletes a description section along with all of its images.
    @Transactional
    public void deleteSection(Long productId, Long sectionId) {
        ProductDescriptionSection section = findSectionOrThrow(productId, sectionId);
        productDescriptionImageRepository.deleteAll(
                productDescriptionImageRepository.findByProductDescriptionSection_IdOrderBySortOrderAsc(sectionId));
        productDescriptionSectionRepository.delete(section);
    }

    // Adds a new image (with optional alt text) to a specific description section.
    @Transactional
    public ProductDescriptionImageResponse addSectionImage(Long productId, Long sectionId,
                                                           ProductDescriptionImageRequest request) {
        ProductDescriptionSection section = findSectionOrThrow(productId, sectionId);

        ProductDescriptionImage image = ProductDescriptionImage.builder()
                .productDescriptionSection(section)
                .url(request.url())
                .altText(request.altText())
                .sortOrder(request.sortOrder() != null ? request.sortOrder() : 0)
                .build();

        return ProductDescriptionImageResponse.fromEntity(productDescriptionImageRepository.save(image));
    }

    // Deletes an image from a description section, verifying both the section and image ownership chain first.
    @Transactional
    public void deleteSectionImage(Long productId, Long sectionId, Long imageId) {
        findSectionOrThrow(productId, sectionId);

        ProductDescriptionImage image = productDescriptionImageRepository
                .findByIdAndProductDescriptionSection_Id(imageId, sectionId)
                .orElseThrow(() -> new ResourceNotFoundException("Description image not found with id: " + imageId));

        productDescriptionImageRepository.delete(image);
    }

    // ---- helpers ----

    // Looks up a description section scoped to its parent product, or throws 404 if it doesn't belong there.
    private ProductDescriptionSection findSectionOrThrow(Long productId, Long sectionId) {
        return productDescriptionSectionRepository.findByIdAndProduct_Id(sectionId, productId)
                .orElseThrow(() -> new ResourceNotFoundException("Description section not found with id: " + sectionId));
    }

    // Looks up a product by ID or throws 404 — the single entry point every write method uses to load its target.
    private Product findProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
    }

    // Resolves a list of tag IDs into managed Tag entities, rejecting the request if any ID doesn't exist.
    private Set<Tag> resolveTags(List<Long> tagIds) {
        if (tagIds == null || tagIds.isEmpty()) return new HashSet<>();

        Set<Tag> tags = new HashSet<>(tagRepository.findAllById(tagIds));
        if (tags.size() != Set.copyOf(tagIds).size()) {
            throw new BadRequestException("One or more tag ids do not exist");
        }
        return tags;
    }
}