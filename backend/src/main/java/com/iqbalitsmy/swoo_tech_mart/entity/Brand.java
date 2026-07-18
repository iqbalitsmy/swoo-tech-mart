package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "brand")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true,length = 180)
    private String slug;

    @Column(length = 500)
    private String logoUrl;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Brand brand)) return false;
        return id != null && id.equals(brand.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
