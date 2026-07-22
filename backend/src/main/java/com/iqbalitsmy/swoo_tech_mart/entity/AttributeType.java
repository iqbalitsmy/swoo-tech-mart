package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attribute_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;    // e.g "Color", "Size"

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if(!(o instanceof AttributeType that)) return false;

        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
