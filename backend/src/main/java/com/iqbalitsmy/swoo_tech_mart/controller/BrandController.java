package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.BrandRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.BrandResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Brand;
import com.iqbalitsmy.swoo_tech_mart.service.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    //------- public ---

    @GetMapping("/api/brands")
    public ApiResponse<List<BrandResponse>> list(@RequestParam(required = false) String search){
        return ApiResponse.success("Brands fetched", brandService.list(search));
    }

    @GetMapping("/api/brands/{slug}")
    public ApiResponse<BrandResponse> getBySlug(@PathVariable String slug){
        return ApiResponse.success("Brand fetched", brandService.getBySlug(slug));
    }

    //-----admin-----

    @PostMapping("/api/admin/brands")
    public ResponseEntity<ApiResponse<BrandResponse>> create(@Valid @RequestBody BrandRequest brandRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Brand created", brandService.create(brandRequest)));
    }

    @PutMapping("/api/admin/brands/{id}")
    public ApiResponse<BrandResponse> update(@PathVariable Long id, @Valid @RequestBody BrandRequest request){
        return ApiResponse.success("updated successfully", brandService.update(id, request));
    }

    @DeleteMapping("/api/admin/brands/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id){
        brandService.delete(id);

        return ApiResponse.success("delete successfully");
    }
}
