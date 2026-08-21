package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ProductVariantFactsResolver {

    private  final ProductVariantRepository productVariantRepository;

    //One active variant → direct Add to Cart. Multiple variants → open Quick Add/Variant Picker.
    public Map<Long, VariantFacts> resolve(List<Long> productIds) {
        if (productIds.isEmpty()) return Map.of();

        Map<Long, List<ProductVariant>> byProductId = new HashMap<>();

        for (ProductVariant variant : productVariantRepository.findByProduct_IdInAndActiveTrue(productIds)){
            byProductId.computeIfAbsent(variant.getProduct().getId(), id -> new ArrayList<>()).add(variant);
        }

        Map<Long, VariantFacts> result = new HashMap<>();
        for(Long productId : productIds){
            List<ProductVariant> variants = byProductId.getOrDefault(productId, List.of());

            result.put(productId, variants.size() == 1 ? new VariantFacts(true, variants.get(0).getId()) : VariantFacts.NONE);
        }
        return  result;
    }


    public static VariantFacts factsFor(Map<Long, VariantFacts> resolve, Long productId){
        return resolve.getOrDefault(productId, VariantFacts.NONE);
    }

    public record VariantFacts(boolean singleVariant, Long defaultVariantId){
        public static VariantFacts NONE = new VariantFacts(false, null);
    }


}
