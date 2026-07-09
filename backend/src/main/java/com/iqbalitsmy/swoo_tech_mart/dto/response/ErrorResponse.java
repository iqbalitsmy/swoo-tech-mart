package com.iqbalitsmy.swoo_tech_mart.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        boolean success,
        int status,
        String error,
        String message,
        String path,
        Instant timestamp,
        Map<String, String> fieldErrors
) {
    public ErrorResponse(int status, String error, String message, String path, Map<String, String> fieldErrors){
        this(false, status, error, message, path, Instant.now(), fieldErrors);
    }
}
