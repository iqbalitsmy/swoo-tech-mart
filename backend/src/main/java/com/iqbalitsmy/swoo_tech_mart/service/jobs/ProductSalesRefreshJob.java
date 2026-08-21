package com.iqbalitsmy.swoo_tech_mart.service.jobs;

import com.iqbalitsmy.swoo_tech_mart.repository.OrderItemRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Recomputes Product.salesCount nightly from OrderItem history.
 *
 * Recompute (not increment-on-order) is chosen deliberately: it's
 * self-healing against refunds/cancellations, and avoids needing to
 * touch Product on the order-placement hot path.
 */
@Component
@RequiredArgsConstructor
public class ProductSalesRefreshJob {

    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    @Scheduled(cron = "0 0 2 * * *") // 2 AM daily
    @Transactional
    public void refresh() {
        Map<Long, Long> soldQuantityByProductId = orderItemRepository.sumQuantityGroupedByProductId();
        productRepository.findAll().forEach(product ->
                product.setSalesCount(soldQuantityByProductId.getOrDefault(product.getId(), 0L)));
        // no explicit save() needed inside @Transactional — dirty checking flushes on commit
    }
}