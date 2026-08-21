package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.RecentlyViewedProduct;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductImageRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.RecentlyViewedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RecentlyViewedService {

    private static final int HISTORY_CAP = 20;
    private static final int DEFAULT_LIMIT = 10;
    private static final int MAX_LIMIT = 50;

    private final RecentlyViewedProductRepository recentlyViewedProductRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductVariantFactsResolver  productVariantFactsResolver;


    @Transactional
    public void recordView(Long userId, String sessionId, Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: "+productId);
        }

        Optional<RecentlyViewedProduct> existing = userId != null ? recentlyViewedProductRepository.findByUserIdAndProduct_Id(userId, productId)
                : recentlyViewedProductRepository.findBySessionIdAndProduct_Id(sessionId, productId) ;

        if (existing.isPresent()) {
            RecentlyViewedProduct entry = existing.get();
            entry.setViewedAt(Instant.now());
            recentlyViewedProductRepository.save(entry);
            return;
        }

        Product product = productRepository.getReferenceById(productId);
        RecentlyViewedProduct entry =  RecentlyViewedProduct.builder()
                .userId(userId)
                .sessionId(userId == null ? sessionId : null)
                .product(product)
                .build();
        recentlyViewedProductRepository.save(entry);

        trimeHistory(userId, sessionId);
    }

    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> getRecentlyViewed(Long userId, String sessionId, int limit) {
        if (userId == null && (sessionId == null || sessionId.isBlank())) {
            return  List.of();
        }

        Pageable pageable = PageRequest.of(0, clampLimit(limit));
        List<RecentlyViewedProduct> entries = userId != null
                ? recentlyViewedProductRepository.findByUserIdOrderByViewedAtDesc(userId, pageable)
                : recentlyViewedProductRepository.findBySessionIdOrderByViewedAtDesc(sessionId, pageable);

        List<Long> productIds = entries.stream().map(e -> e.getProduct().getId()).distinct().toList();
        Map<Long, String> thumbnails = firstImageProductId(productIds);
        Map<Long, ProductVariantFactsResolver.VariantFacts> variantFacts = productVariantFactsResolver.resolve(productIds);

        return entries.stream()
                .map(e -> {
                    Product product = e.getProduct();
                    var facts = ProductVariantFactsResolver.factsFor(variantFacts, product.getId());

                    return ProductSummaryResponse.fromEntity(
                            product,
                            thumbnails.get(product.getId()),
                            facts.singleVariant(),
                            facts.defaultVariantId()
                    );
                }
                ).toList();
    }

    @Transactional
    public void removeOne(Long userId, String sessionId, Long productId) {
        if (userId != null){
            recentlyViewedProductRepository.deleteByUserIdAndProduct_Id(userId, productId);
        } else if(sessionId != null && !sessionId.isBlank()){
            recentlyViewedProductRepository.deleteBySessionIdAndProduct_Id(sessionId, productId);
        }
    }

    @Transactional
    public void clearAll(Long userId, String sessionId) {
        if (userId != null){
            recentlyViewedProductRepository.deleteByUserId(userId);
        }  else if(sessionId != null && !sessionId.isBlank()){
            recentlyViewedProductRepository.deleteBySessionId(sessionId);
        }
    }


    //------ helpers ----
    private void trimeHistory(Long userId, String sessionId) {
        long count = userId != null
            ? recentlyViewedProductRepository.countByUserId(userId)
            : recentlyViewedProductRepository.countBySessionId(sessionId);

        if (count <= HISTORY_CAP) return;

        List<RecentlyViewedProduct> oldestFirst = userId != null
                ? recentlyViewedProductRepository.findByUserIdOrderByViewedAtAsc(userId)
                : recentlyViewedProductRepository.findBySessionIdOrderByViewedAtAsc(sessionId);

        int excess = (int) (count - HISTORY_CAP);

        recentlyViewedProductRepository.deleteAll(oldestFirst.subList(0, excess));
    }

    private int clampLimit (int limit) {
        if (limit <= 0) return DEFAULT_LIMIT;
        return Math.min(limit, MAX_LIMIT);
    }

    private Map<Long, String> firstImageProductId(List<Long> productIds) {
        if (productIds.isEmpty()) return Map.of();

        Map<Long, String> result = new HashMap<>();

        for(var image: productImageRepository.findByProduct_IdInOrderByProduct_IdAscSortOrderAsc(productIds)){
            result.putIfAbsent(image.getProduct().getId(), image.getUrl());
        }

        return result;
    }
}
