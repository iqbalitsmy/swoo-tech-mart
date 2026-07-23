package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.OrderItem;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    boolean existsByProductVariant_Id(Long productVariantId);

    /**
     * "Has this user actually bought this product?" — traverses
     * OrderItem -> ProductVariant -> Product for the product match, and
     * OrderItem -> Order for the owning user + a non-cancelled order.
     * Used to gate Review creation.
     */
    boolean existsByProductVariant_Product_IdAndOrder_UserIdAndOrder_StatusNot(Long productId, Long userId, OrderStatus excludedStatus);
}
