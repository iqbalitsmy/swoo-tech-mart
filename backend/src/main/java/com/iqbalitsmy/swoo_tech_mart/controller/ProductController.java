package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.response.*;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.StockStatus;
import com.iqbalitsmy.swoo_tech_mart.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    // Filters/searches the product catalog (category, brand, tag, price range, stock, keyword) with pagination + sorting.
    @GetMapping
    public ApiResponse<PageResponse<ProductSummaryResponse>> search(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) StockStatus stockStatus,
            @RequestParam(required = false) Boolean isNew,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String q
    ) {
        var results = productService.search(
                categoryId, brandId, tag, minPrice, maxPrice, stockStatus, isNew, sort, page, size, q);
        return ApiResponse.success("Products fetched", results);
    }

    // Fetches the full detail view of a single product using its SEO-friendly slug instead of its numeric ID.
    @GetMapping("/{slug}")
    public ApiResponse<ProductDetailResponse> getBySlug(@PathVariable String slug) {
        return ApiResponse.success("Product fetched", productService.getBySlug(slug));
    }

    // Suggests other products related to the given product ID (e.g. same category/tags), capped at `limit` results.
    @GetMapping("/{id}/related")
    public ApiResponse<List<ProductSummaryResponse>> getRelated(
            @PathVariable Long id,
            @RequestParam(defaultValue = "8") int limit
    ) {
        return ApiResponse.success("Related products fetched", productService.getRelated(id, limit));
    }

    // Returns the product's long-form description broken into ordered sections (e.g. Overview, Specs, Care).
    @GetMapping("/{id}/description")
    public ApiResponse<List<ProductDescriptionSectionResponse>> getDescription(@PathVariable Long id) {
        return ApiResponse.success("Description fetched", productService.getDescription(id));
    }
}