package com.iqbalitsmy.swoo_tech_mart.dto.response;

public record CloudinarySignatureResponse(
        String signature,
        long timestamp,
        String apiKey,
        String cloudName,
        String folder
) {
}
