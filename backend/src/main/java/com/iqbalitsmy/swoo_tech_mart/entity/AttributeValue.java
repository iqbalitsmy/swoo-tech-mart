package com.iqbalitsmy.swoo_tech_mart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "attribute_value", uniqueConstraints = {
        @UniqueConstraint(name = "uk_attribute_value_type_value", columnNames = {"attribute_type_id", "attribute_value"})
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "attribute_type_id", nullable = false)
    private AttributeType attributeType;

    @Column(nullable = false, length = 100)
    private String label;   // display text, e.g. "Red"

    @Column(name = "attribute_value", nullable = false, length = 100)
    private String value;   // underlying value, e.g. "#FF0000" or "red"

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AttributeValue that)) return false;

        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
