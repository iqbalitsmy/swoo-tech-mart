package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductFilter.ProductFilterResponse;
import com.iqbalitsmy.swoo_tech_mart.service.ProductFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductFilterController {
    private final ProductFilterService productFilterService;

    @GetMapping("/filters")
    public ApiResponse<ProductFilterResponse> getProductFilters(@RequestParam(required = false) String slug) {
        return ApiResponse.success("Filtered fetched", productFilterService.getProductFilters(slug));
    }
}
