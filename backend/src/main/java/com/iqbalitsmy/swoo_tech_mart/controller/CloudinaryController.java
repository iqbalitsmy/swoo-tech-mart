package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CloudinarySignatureResponse;
import com.iqbalitsmy.swoo_tech_mart.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cloudinary")
@RequiredArgsConstructor
public class CloudinaryController {
    private final CloudinaryService cloudinaryService;

    @GetMapping("/signature")
    public ApiResponse<CloudinarySignatureResponse> getSignature(){
        return ApiResponse.success("signature generated", cloudinaryService.generateSignature());
    }
}
