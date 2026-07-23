package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_description")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String introHtml;

    @Column(length = 500)
    private String heroImageUrl;

    @Column(length = 255)
    private String heroCaption;

    @Column(length = 255)
    private String subSectionTitle;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String subSectionBodyHtml;
}
