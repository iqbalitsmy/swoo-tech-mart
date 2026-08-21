package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.OrderItem;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    boolean existsByProductVariant_Id(Long productVariantId);

    List<OrderItem> findByOrder_Id(Long orderId);

    List<OrderItem> findByOrder_IdIn(List<Long> orderIds);

    /**
     * "Has this user actually bought this product?" — traverses
     * OrderItem -> ProductVariant -> Product for the product match, and
     * OrderItem -> Order for the owning user + a non-cancelled order.
     * Used to gate Review creation.
     */
    boolean existsByProductVariant_Product_IdAndOrder_UserIdAndOrder_StatusNot(Long productId, Long userId, OrderStatus excludedStatus);

    @Query("""
    SELECT oi.productVariant.product.id, SUM(oi.quantity)
    FROM OrderItem oi
    GROUP BY oi.productVariant.product.id
    """)
    List<Object[]> sumQuantityGroupedByProductIdRaw();

    default Map<Long, Long> sumQuantityGroupedByProductId() {
        return sumQuantityGroupedByProductIdRaw().stream()
                .collect(Collectors.toMap(
                        row -> (Long) row[0],
                        row -> (Long) row[1]));
    }

    boolean existsByProductVariant_Product_IdAndOrder_UserIdAndOrder_Status(Long productId, Long userId, OrderStatus status);

    boolean existsByOrder_UserIdAndProductVariant_Product_Id(Long userId, Long productId);

//    boolean existsByOrder_UserIdAndProductVariant_Product_IdAndOrder_Status(Long userId, Long productId, OrderStatus status);
}
