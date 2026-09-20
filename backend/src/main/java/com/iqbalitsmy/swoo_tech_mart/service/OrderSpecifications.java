package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import org.springframework.data.jpa.domain.Specification;

public class OrderSpecifications {
    private OrderSpecifications() {}

    static Specification<Order> userId(Long userId) {
        if (userId == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return (root, query, cb) ->
                cb.equal(root.get("userId"), userId);
    }

    static Specification<Order> status(OrderStatus status) {
        if (status == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }
}
