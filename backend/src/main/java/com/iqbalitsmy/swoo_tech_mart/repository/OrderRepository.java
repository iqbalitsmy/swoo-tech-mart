package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, JpaSpecificationExecutor<Order> {
    /**
     * Checks whether this shipping address is still referenced by any order
     * NOT in the given status (e.g. exclude CANCELLED).
     *
     * "existsBy" -> returns boolean via SELECT EXISTS(...), not the full entity;
     * cheaper than findBy when you only need a yes/no.
     *
     * Use case: guard against deleting an address that's still tied to an
     * active order. Call with excludedStatus = OrderStatus.CANCELLED (or
     * DELIVERED, depending on business rule) before allowing address deletion —
     * if this returns true, block the delete and return a proper error instead
     * of letting a FK constraint fail or silently orphaning order history.
     */
    // Checks whether the shipping address is used by any order except those with the specified status.
    boolean existsByShippingAddressIdAndStatusNot(Long shippingAddressId, OrderStatus excludedStatus);

    Optional<Order> findByIdAndUserId(Long id, Long userId);

    boolean existsByOrderNumber(String orderNumber);
}
