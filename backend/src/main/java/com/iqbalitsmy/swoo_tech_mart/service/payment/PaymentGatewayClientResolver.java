package com.iqbalitsmy.swoo_tech_mart.service.payment;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PaymentGatewayClientResolver {

    private final List<PaymentGatewayClient> clients;

    public PaymentGatewayClient resolve(PaymentProvider provider){
        return clients.stream()
                .filter(client -> client.supports(provider))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No payment gateway configured for provider: "+provider));
    }
}
