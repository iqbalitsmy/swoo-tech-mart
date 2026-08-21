package com.iqbalitsmy.swoo_tech_mart.service.payment;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import com.iqbalitsmy.swoo_tech_mart.exception.PaymentGatewayException;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.RequestOptions;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Slf4j
@Component
public class StripePaymentGatewayClient implements PaymentGatewayClient {

    private final String webhookSecret;
    private final String defaultCurrency;

    public StripePaymentGatewayClient(
            @Value("${app.payments.stripe.secret-key}") String secretKey,
            @Value("${app.payments.stripe.webhook-secret}") String webhookSecret,
            @Value("${app.payments.currency:usd}") String defaultCurrency
    ){
        this.webhookSecret = webhookSecret;
        this.defaultCurrency = defaultCurrency;
        Stripe.apiKey = secretKey;
    }

    @Override
    public boolean supports(PaymentProvider provider) {
        return provider == PaymentProvider.STRIPE;
    }

    @Override
    public GatewayInitiationResult initiate(Payment payment) {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(toSmallestCurrencyUnit(payment.getAmount()))
                .setCurrency(payment.getCurrency() != null ? payment.getCurrency() : defaultCurrency)
                .putMetadata("orderId", String.valueOf(payment.getOrder().getId()))
                .putMetadata("paymentId", String.valueOf(payment.getId()))
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        RequestOptions options = RequestOptions.builder()
                .setIdempotencyKey("payment-intent-"+payment.getId())
                .build();

        try {
            PaymentIntent intent = PaymentIntent.create(params, options);
            return new GatewayInitiationResult(intent.getId(), intent.getClientSecret(), null);

        } catch (StripeException e) {
            log.error("Stripe PaymentIntent creation failed for payment {}:{}", e.getMessage(),e.getMessage());

            throw new PaymentGatewayException("Could not start payment with Stripe: " + e.getMessage(), e);
        }
    }

    @Override
    public GatewayInitiationResult retrieve(String providerReference) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(providerReference);
            return new GatewayInitiationResult(intent.getId(), intent.getClientSecret(), null);
        } catch (StripeException e) {
            log.error("Stripe PaymentIntent retrieval failed for {}: {}", providerReference, e.getMessage());
            throw new PaymentGatewayException("Could not retrieve payment from Stripe: " + e.getMessage(), e);
        }
    }

    @Override
    public WebhookVerificationResult verifyAndParseWebhook(String rawBody, String signatureHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(rawBody, signatureHeader, webhookSecret);
        } catch (SignatureVerificationException e){
            log.warn("Stripe webhook signature verification failed: {}", e.getMessage());
            return WebhookVerificationResult.invalidSignature();
        }

        return switch (event.getType()){
            case "payment_intent.succeeded" -> toResult(event, true, null);
            case "payment_intent.payment_failed" -> toResult(event, false, extractFailureReason(event));
            default -> {
                log.debug("Ignoring unhandled Stripe event type: {}", event.getType());
                yield WebhookVerificationResult.ignored();
            }
        };
    }

private WebhookVerificationResult toResult(Event event, boolean succeeded, String failureReason) {
    StripeObject stripeObject = event.getDataObjectDeserializer().getObject().orElse(null);

    if (!(stripeObject instanceof PaymentIntent intent)) {
        log.warn("Stripe event {} had no deserializable PaymentIntent payload", event.getId());

        return WebhookVerificationResult.ignored();
    }

    return WebhookVerificationResult.verified(new GatewayWebhookEvent(intent.getId(), succeeded, failureReason));

}

private String extractFailureReason(Event event){
        return event.getDataObjectDeserializer().getObject()
                .filter(PaymentIntent.class::isInstance)
                .map(PaymentIntent.class::cast)
                .map(PaymentIntent::getLastPaymentError)
                .map(err -> err.getMessage())
                .orElse("Payment failed");
}

    private long toSmallestCurrencyUnit(BigDecimal amount){
        return amount.multiply(BigDecimal.valueOf(100)).setScale(0, RoundingMode.HALF_UP).longValueExact();
    }
}

