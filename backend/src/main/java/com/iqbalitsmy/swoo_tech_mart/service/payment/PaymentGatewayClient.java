package com.iqbalitsmy.swoo_tech_mart.service.payment;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;

public interface PaymentGatewayClient {

    GatewayInitiationResult initiate(Payment payment);

    boolean verifyWebhookSignature(String rawBody, String signatureHeader);

    GatewayWebhookEvent parseWebhookEvent(String rawBody);

    record GatewayInitiationResult(String providerReference, String clientSecret, String redirectUrl){}

    record GatewayWebhookEvent(String providerReference, boolean succeeded, String failureReason){}
}
