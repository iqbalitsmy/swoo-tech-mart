package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.AttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttributeValueRepository extends JpaRepository<AttributeValue,Long> {
    List<AttributeValue> findByAttributeType_IdOrderByLabelAsc(Long attributeTypeId);

    boolean existsByAttributeType_IdAndValueIgnoreCase(Long attributeTypeId,String value);
}
