package com.iqbalitsmy.swoo_tech_mart.service.payment;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;

public interface PaymentGatewayClient {

    boolean supports(PaymentProvider provider);

    GatewayInitiationResult initiate(Payment payment);

    GatewayInitiationResult retrieve(String providerReference);

    WebhookVerificationResult verifyAndParseWebhook(String rawBody, String signatureHeader);

    record GatewayInitiationResult(String providerReference, String clientSecret, String redirectUrl){}

    record GatewayWebhookEvent(String providerReference, boolean succeeded, String failureReason){}

    enum WebhookStatus {
        INVALID_SIGNATURE,
        IGNORED,
        VERIFIED,
    }

    record WebhookVerificationResult(WebhookStatus status, GatewayWebhookEvent event){
        public static WebhookVerificationResult invalidSignature(){
            return new WebhookVerificationResult(WebhookStatus.INVALID_SIGNATURE, null);
        }

        public static WebhookVerificationResult ignored(){
            return new WebhookVerificationResult(WebhookStatus.IGNORED, null);
        }

        public static WebhookVerificationResult verified(GatewayWebhookEvent event){
            return new WebhookVerificationResult(WebhookStatus.VERIFIED, event);
        }
    }
}
