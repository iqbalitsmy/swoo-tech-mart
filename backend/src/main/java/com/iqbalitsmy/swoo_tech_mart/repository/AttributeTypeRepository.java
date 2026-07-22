package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.AttributeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttributeTypeRepository  extends JpaRepository<AttributeType, Long> {

    List<AttributeType> findAllByOrderByNameAsc();

    Optional<AttributeType> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);
}
