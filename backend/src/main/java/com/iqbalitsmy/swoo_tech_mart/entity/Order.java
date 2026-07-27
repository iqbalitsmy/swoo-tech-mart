package com.iqbalitsmy.swoo_tech_mart.entity;

import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.PaymentProvider;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String orderNumber;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status;

    @Column(name = "shipping_address_id")
    private Long shippingAddressId;

    // ---- Shipping address snapshot, captured at checkout ----
    @Column(nullable = false, length = 150)
    private String shippingRecipientName;

    @Column(nullable = false, length = 255)
    private String shippingLine1;

    @Column(length = 255)
    private String shippingLine2;

    @Column(nullable = false, length = 255)
    private String shippingCity;

    @Column(nullable = false, length = 255)
    private String shippingState;

    @Column(nullable = false, length = 255)
    private String shippingPostalCode;

    //The gateway chosen at checkout
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentProvider paymentProvider;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subTotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal shippingFee;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    private Instant updatedAt;

    @PrePersist
    private void onCreated() {
        if (createdAt == null) {
            this.createdAt = Instant.now();
        }
    }

    @PreUpdate
    private void onUpdated() {
        this.updatedAt = Instant.now();
    }
}
