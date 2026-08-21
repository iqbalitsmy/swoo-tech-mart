package com.iqbalitsmy.swoo_tech_mart.service.payment;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.UUID;

@Slf4j
@Component
public class MockPaymentGatewayClient implements PaymentGatewayClient {

    private final String webhookSecret;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public MockPaymentGatewayClient(@Value("${app.payments.webhook-secret}") String webhookSecret) {
        this.webhookSecret = webhookSecret;
    }

    @Override
    public boolean supports(PaymentProvider provider) {
        return provider != PaymentProvider.STRIPE;
    }

    @Override
    public GatewayInitiationResult initiate(Payment payment) {
        String reference = payment.getProvider().name().toLowerCase() + "_" + UUID.randomUUID();
        String clientSecret = reference + "_secret_" + UUID.randomUUID();
        String redirectUrl = "https://mock-gateway.local/checkout/" + reference;

        log.info("Mock gateway: initiated payment {} for order {} ({} {})",
                reference, payment.getOrder().getId(), payment.getAmount(), payment.getProvider());

        return new GatewayInitiationResult(reference, clientSecret, redirectUrl);
    }

    @Override
    public GatewayInitiationResult retrieve(String providerReference) {
        String clientSecret = providerReference + "_secret_" + UUID.randomUUID();
        String redirectUrl = "https://mock-gateway.local/checkout/" + providerReference;
        return new GatewayInitiationResult(providerReference, clientSecret, redirectUrl);
    }

    @Override
    public WebhookVerificationResult verifyAndParseWebhook(String rawBody, String signatureHeader) {
        if (!verifySignature(rawBody, signatureHeader)) {
            return WebhookVerificationResult.invalidSignature();
        }

        try {
            JsonNode node = objectMapper.readTree(rawBody);
            String providerReference = node.path("providerReference").asText(null);
            String status = node.path("status").asText("");
            String failureReason = node.path("failureReason").asText(null);

            return WebhookVerificationResult.verified(
                    new GatewayWebhookEvent(providerReference, "SUCCEEDED".equalsIgnoreCase(status), failureReason));
        } catch (Exception e) {
            throw new IllegalArgumentException("Malformed webhook payload: " + e.getMessage(), e);
        }
    }

    private boolean verifySignature(String rawBody, String signatureHeader) {
        if (signatureHeader == null || signatureHeader.isBlank()) return false;

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] computed = mac.doFinal(rawBody.getBytes(StandardCharsets.UTF_8));
            String computedHex = HexFormat.of().formatHex(computed);

            return MessageDigest.isEqual(
                    computedHex.getBytes(StandardCharsets.UTF_8),
                    signatureHeader.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            log.warn("Webhook signature verification failed to compute: {}", e.getMessage());
            return false;
        }
    }
}
