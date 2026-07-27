package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PaymentInitiationResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PaymentStatusResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private static final String SIGNATURE_HEADER = "X-Signature";

    private final PaymentService paymentService;

    @PostMapping("/{orderId}/initiate")
    public ResponseEntity<ApiResponse<PaymentInitiationResponse>> initiate(
            @AuthenticationPrincipal UserPrincipal principal, @PathVariable Long orderId) {
        PaymentInitiationResponse result = paymentService.initiate(orderId, principal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Payment initiated", result));
    }

    @GetMapping("/{orderId}/status")
    public ApiResponse<PaymentStatusResponse> getStatus(
            @AuthenticationPrincipal UserPrincipal principal, @PathVariable Long orderId) {
        return ApiResponse.success("Payment status fetched", paymentService.getStatus(orderId, principal.getId()));
    }

    /**
     * Public — no JWT, no @AuthenticationPrincipal. Trust comes entirely
     * from the signature header, verified against the raw body inside
     * PaymentService.handleWebhook. {provider} is accepted for routing/
     * logging clarity but isn't otherwise used yet, since only the mock
     * gateway exists; a real per-provider integration might dispatch on it.
     */

    @PostMapping("/webhook/{provider}")
    public ResponseEntity<Void> handleWebhook(
            @PathVariable String provider,
            @RequestHeader(name = SIGNATURE_HEADER, required = false) String signature,
            HttpServletRequest request
    ) throws IOException {
        String rawBody = readRawBody(request);
        paymentService.handleWebhook(rawBody, signature);
        return ResponseEntity.ok().build();
    }

    private String readRawBody(HttpServletRequest request) throws IOException {
        StringBuilder body = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                body.append(line);
            }
        }
        return body.toString();
    }
}
