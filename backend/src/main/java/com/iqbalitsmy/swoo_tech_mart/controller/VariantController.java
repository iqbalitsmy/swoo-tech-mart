package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ProductVariantImageRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.ProductVariantUpdateRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductVariantImageResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductVariantResponse;
import com.iqbalitsmy.swoo_tech_mart.service.ProductVariantsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class VariantController {
    private final ProductVariantsService productVariantsService;

    // -------public------

    @GetMapping("/api/variants/{variantId}")
    public ApiResponse<ProductVariantResponse> getById(@PathVariable Long variantId){
        return ApiResponse.success("Variant fetched", productVariantsService.getById(variantId));
    }

    // -------admin------

    @PutMapping("/api/admin/variants/{variantId}")
    public ApiResponse<ProductVariantResponse> update(@PathVariable Long variantId, @Valid @RequestBody ProductVariantUpdateRequest request){
        return ApiResponse.success("Variant updated", productVariantsService.update(variantId, request));
    }

    @DeleteMapping("/api/admin/variants/{variantId}")
    public ApiResponse<Void> delete(@PathVariable Long variantId){
        boolean hardDelete =  productVariantsService.delete(variantId);
        String message = hardDelete ? "Variant deleted" : "Variant is referenced by existing orders — disabled instead of deleted";

        return ApiResponse.success(message);
    }
    // -------images--------
    @PostMapping("/api/admin/variants/{variantsId}/images")
    public ResponseEntity<ApiResponse<ProductVariantImageResponse>> addImage(@PathVariable Long variantsId, @Valid @RequestBody ProductVariantImageRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Variant image added", productVariantsService.addImage(variantsId, request)));
    }

    @DeleteMapping("/api/admin/variants/{variantsId}/images/{image}")
    public ApiResponse<Void> deleteImage(@PathVariable Long variantsId, @PathVariable Long image){
        productVariantsService.deleteImage(variantsId, image);
        return ApiResponse.success("Image removed");
    }

}
