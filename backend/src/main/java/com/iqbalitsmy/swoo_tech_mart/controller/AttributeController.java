package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.AttributeTypeRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.AttributeValueRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AttributeTypeResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AttributeValueResponse;
import com.iqbalitsmy.swoo_tech_mart.service.AttributeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttributeController {
    private final AttributeService attributeService;

    //-----public--------

    @GetMapping("/api/attribute-types")
    public ApiResponse<List<AttributeTypeResponse>> listTypes() {

        return ApiResponse.success("Attributes types fetched", attributeService.listType());
    }

    @GetMapping("/api/attribute-types/{id}/values")
    public ApiResponse<List<AttributeValueResponse>> listValues(@PathVariable Long id) {
        return ApiResponse.success("Attributes values fetched", attributeService.listValues(id));
    }

    //----admin-----

    @PostMapping("/api/admin/attribute-types")
    public ResponseEntity<ApiResponse<AttributeTypeResponse>> createType(@Valid @RequestBody AttributeTypeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Attributes created", attributeService.createType(request)));
    }

    @PostMapping("/api/admin/attribute-types/{id}/values")
    public ResponseEntity<ApiResponse<AttributeValueResponse>> addValue(@PathVariable Long  id, @Valid @RequestBody AttributeValueRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Attributes values created", attributeService.addValue(id, request)));
    }

    @DeleteMapping("/api/admin/attribute-values/{id}")
    public ApiResponse<Void> deleteValues(@PathVariable Long id) {
        attributeService.deleteValue(id);

        return ApiResponse.success("Attribute values deleted");
    }
}
