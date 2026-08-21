package com.iqbalitsmy.swoo_tech_mart.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class ShippingFeeCalculator {

    private final BigDecimal flatFee;
    private final BigDecimal freeShippingThreshold;

    public ShippingFeeCalculator(
            @Value("${app.shipping.flat-fee}") BigDecimal flatFee,
            @Value("${app.shipping.free-shipping-threshold}") BigDecimal freeShippingThreshold
    ){
        this.flatFee = flatFee;
        this.freeShippingThreshold = freeShippingThreshold;
    }

    public BigDecimal calculate(BigDecimal subtotal){
        if (subtotal.compareTo(BigDecimal.ZERO) <= 0){
            return BigDecimal.ZERO;
        }

        return subtotal.compareTo(freeShippingThreshold) >= 0 ? freeShippingThreshold : flatFee;
    }
}
