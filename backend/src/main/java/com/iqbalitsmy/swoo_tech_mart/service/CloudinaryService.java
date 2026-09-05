package com.iqbalitsmy.swoo_tech_mart.service;

import com.cloudinary.Cloudinary;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CloudinarySignatureResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    @Value("${cloudinary.upload-folder}")
    private String uploadFolder;

    public CloudinarySignatureResponse generateSignature(){
        long timestamp = System.currentTimeMillis() / 1000L;

        Map<String, Object> paramsToSign = new TreeMap<>();
        paramsToSign.put("timestamp", timestamp);
        paramsToSign.put("folder", uploadFolder);

        String signature = cloudinary.apiSignRequest(
                paramsToSign,
                cloudinary.config.apiSecret
        );

        return new CloudinarySignatureResponse(
                signature,
                timestamp,
                cloudinary.config.apiKey,
                cloudinary.config.cloudName,
                uploadFolder
        );
    }
}
