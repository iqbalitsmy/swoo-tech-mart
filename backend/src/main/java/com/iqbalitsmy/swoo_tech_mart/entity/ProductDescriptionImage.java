package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_description_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDescriptionImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_description_id", nullable = false)
    private ProductDescriptionSection productDescriptionSection;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(length = 255)
    private String altText;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
