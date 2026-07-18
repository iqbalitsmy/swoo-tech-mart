package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CategoryRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CategoryResponse;
import com.iqbalitsmy.swoo_tech_mart.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    // ---- public ----

    @GetMapping("/api/categories")
    public ApiResponse<List<CategoryResponse>> list(@RequestParam(required = false) Long parentId){
        return ApiResponse.success("Categories fetched", categoryService.list(parentId));
    }

    @GetMapping("/api/categories/{slug}")
    public ApiResponse<CategoryResponse> getBySlug(@PathVariable String slug){
        return ApiResponse.success("Category fetched", categoryService.getBySlug(slug));
    }

    //--- admin writes ----

    @PostMapping("/api/admin/categories")
    public ResponseEntity<ApiResponse<CategoryResponse>> create(@Valid @RequestBody CategoryRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Category created", categoryService.create(request)));
    }

    @PutMapping("/api/admin/categories/{id}")
    public ApiResponse<CategoryResponse> update(@PathVariable Long id, @Valid @RequestBody CategoryRequest request){
        return ApiResponse.success("Category updated", categoryService.update(id, request));
    }

    @DeleteMapping("/api/admin/categories/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id){
        categoryService.delete(id);
        return ApiResponse.success("Category deleted");
    }

}
