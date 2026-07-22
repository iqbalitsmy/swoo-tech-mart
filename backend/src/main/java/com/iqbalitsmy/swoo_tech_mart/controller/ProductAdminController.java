package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.*;
import com.iqbalitsmy.swoo_tech_mart.dto.response.*;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import com.iqbalitsmy.swoo_tech_mart.service.ProductAdminService;
import com.iqbalitsmy.swoo_tech_mart.service.ProductVariantsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Admin-only catalog writes. Access is restricted to ROLE_ADMIN by the
 * `/api/admin/**` matcher in SecurityConfig.
 */
@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class ProductAdminController {

    private final ProductAdminService productAdminService;
    private final ProductVariantsService  productVariantsService;


    // ---- Product ----
    // Creates a new product from the request payload and returns 201 with the created resource.
    @PostMapping
    public ResponseEntity<ApiResponse<ProductDetailResponse>> createProduct(@Valid @RequestBody ProductRequest request) {
        ProductDetailResponse created = productAdminService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Product created", created));
    }

    // Overwrites an existing product's fields with the given request payload.
    @PutMapping("/{id}")
    public ApiResponse<ProductDetailResponse> updateProduct(@PathVariable Long id,
                                                            @Valid @RequestBody ProductRequest request) {
        return ApiResponse.success("Product updated", productAdminService.updateProduct(id, request));
    }

    // Deletes a product by ID (and, presumably, its dependent images/highlights/sections via cascade).
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        productAdminService.deleteProduct(id);
        return ApiResponse.success("Product deleted");
    }
    //------variants-------

    // Creating product variants
    @PostMapping("/{id}/variants")
    public ResponseEntity<ApiResponse<ProductVariantResponse>> createVariant(@PathVariable Long id, @Valid @RequestBody ProductVariantCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Variant created", productVariantsService.create(id, request)));
    }

    // ---- Images ----
    // Attaches a new image to the product and returns 201 with the created image record.
    @PostMapping("/{id}/images")
    public ResponseEntity<ApiResponse<ProductImageResponse>> addImage(@PathVariable Long id,
                                                                      @Valid @RequestBody ProductImageRequest request) {
        ProductImageResponse image = productAdminService.addImage(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Image added", image));
    }

    // Removes a specific image from a product by its image ID.
    @DeleteMapping("/{id}/images/{imageId}")
    public ApiResponse<Void> deleteImage(@PathVariable Long id, @PathVariable Long imageId) {
        productAdminService.deleteImage(id, imageId);
        return ApiResponse.success("Image removed");
    }

    // Updates the display order of a product's images (e.g. drag-and-drop reordering in admin UI).
    @PutMapping("/{id}/images/reorder")
    public ApiResponse<List<ProductImageResponse>> reorderImages(
            @PathVariable Long id,
            @RequestBody List<ImageReorderItemRequest> items
    ) {
        return ApiResponse.success("Images reordered", productAdminService.reorderImages(id, items));
    }

    // ---- Highlights ----
    // Adds a new highlight/feature bullet point to the product and returns 201 with the created record.
    @PostMapping("/{id}/highlights")
    public ResponseEntity<ApiResponse<ProductHighlightResponse>> addHighlight(
            @PathVariable Long id, @Valid @RequestBody ProductHighlightRequest request) {
        ProductHighlightResponse highlight = productAdminService.addHighlight(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Highlight added", highlight));
    }

    // Removes a specific highlight from a product by its highlight ID.
    @DeleteMapping("/{id}/highlights/{highlightId}")
    public ApiResponse<Void> deleteHighlight(@PathVariable Long id, @PathVariable Long highlightId) {
        productAdminService.deleteHighlight(id, highlightId);
        return ApiResponse.success("Highlight removed");
    }

    // ---- Description sections ----
    // Adds a new section (e.g. "Specifications", "Care Instructions") to the product's long-form description.
    @PostMapping("/{id}/description/sections")
    public ResponseEntity<ApiResponse<ProductDescriptionSectionResponse>> addSection(
            @PathVariable Long id, @Valid @RequestBody ProductDescriptionSectionRequest request) {
        ProductDescriptionSectionResponse section = productAdminService.addSection(id, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Section added", section));
    }

    // Overwrites the content of an existing description section.
    @PutMapping("/{id}/description/sections/{sectionId}")
    public ApiResponse<ProductDescriptionSectionResponse> updateSection(
            @PathVariable Long id, @PathVariable Long sectionId,
            @Valid @RequestBody ProductDescriptionSectionRequest request) {
        return ApiResponse.success("Section updated", productAdminService.updateSection(id, sectionId, request));
    }

    // Removes a description section from the product entirely.
    @DeleteMapping("/{id}/description/sections/{sectionId}")
    public ApiResponse<Void> deleteSection(@PathVariable Long id, @PathVariable Long sectionId) {
        productAdminService.deleteSection(id, sectionId);
        return ApiResponse.success("Section removed");
    }

    // Adds an image to a specific description section (e.g. inline diagram within "Specifications").
    @PostMapping("/{id}/description/sections/{sectionId}/images")
    public ResponseEntity<ApiResponse<ProductDescriptionImageResponse>> addSectionImage(
            @PathVariable Long id, @PathVariable Long sectionId,
            @Valid @RequestBody ProductDescriptionImageRequest request) {
        ProductDescriptionImageResponse image = productAdminService.addSectionImage(id, sectionId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Section image added", image));
    }

    // Removes a specific image from a specific description section.
    @DeleteMapping("/{id}/description/sections/{sectionId}/images/{imgId}")
    public ApiResponse<Void> deleteSectionImage(@PathVariable Long id, @PathVariable Long sectionId,
                                                @PathVariable Long imgId) {
        productAdminService.deleteSectionImage(id, sectionId, imgId);
        return ApiResponse.success("Section image removed");
    }
}