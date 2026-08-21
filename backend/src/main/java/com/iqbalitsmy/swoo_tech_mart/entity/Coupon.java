package com.iqbalitsmy.swoo_tech_mart.entity;


import com.iqbalitsmy.swoo_tech_mart.entity.enums.DiscountType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "coupon")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DiscountType discountType;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal discountValue;

    /** Cart subtotal must be at least this for the coupon to apply. Null = no minimum. */
    @Column(precision = 12, scale = 2)
    private BigDecimal minSubtotal;

    /** Caps the computed discount — mainly meaningful for PERCENTAGE ("15% off, up to $50"). Null = uncapped. */
    @Column(precision = 12, scale = 2)
    private BigDecimal maxDiscountAmount;

    /** Null = never expires. */
    private Instant expiresAt;

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Coupon cupon)) return false;
        return id != null && id.equals(cupon.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
