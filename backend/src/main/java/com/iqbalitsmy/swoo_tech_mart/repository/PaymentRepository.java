package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    /** "Current" status for an order == its most recent Payment attempt. */
    Optional<Payment> findTopByOrder_IdOrderByCreatedAtDesc(Long orderId);

    Optional<Payment> findByProviderReference(String providerReference);
}
