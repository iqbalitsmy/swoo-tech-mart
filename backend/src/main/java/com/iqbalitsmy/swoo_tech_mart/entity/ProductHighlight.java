package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_highlight")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductHighlight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, length = 500)
    private String text;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
