package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.TagRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.TagResponse;
import com.iqbalitsmy.swoo_tech_mart.service.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    //----public----
    @GetMapping("/api/tags")
    public ApiResponse<List<TagResponse>> list(){
        return ApiResponse.success("tag fetched successfully", tagService.listAll());
    }

    // ----admin---
    @PostMapping("/api/admin/tags")
    public ResponseEntity<ApiResponse<TagResponse>> add(@Valid @RequestBody TagRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("tag created successfully", tagService.create(request)));
    }

    @DeleteMapping("/api/admin/tags/{id}")
    public ApiResponse<TagResponse> delete(@PathVariable Long id){
        tagService.delete(id);
        return ApiResponse.success("tag deleted");
    }
}
