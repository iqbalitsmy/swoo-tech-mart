package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.OrderAdminSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.OrderDetailsResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PageResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Order;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.OrderRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminOrderService {

    private static final Map<OrderStatus, Set<OrderStatus>> ALLOWED_TRANSITIONS = new EnumMap<>(Map.of(
            OrderStatus.PENDING, Set.of(OrderStatus.CONFIRMED, OrderStatus.CANCELED),
            OrderStatus.CONFIRMED, Set.of(OrderStatus.SHIPPED, OrderStatus.CANCELED),
            OrderStatus.SHIPPED, Set.of(OrderStatus.DELIVERED),
            OrderStatus.DELIVERED, Set.of(OrderStatus.REFUNDED),
            OrderStatus.CANCELED, Set.of(),
            OrderStatus.REFUNDED, Set.of()
    ));

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderService orderService;

    @Transactional(readOnly = true)
    public PageResponse<OrderAdminSummaryResponse> listAll(int page, int size, OrderStatus status, Long userId) {
        Specification<Order> spec = Specification
                .where(OrderSpecifications.userId(userId))
                .and(OrderSpecifications.status(status));

        Pageable pageable = PageRequest.of(Math.max(page, 0), clampSize(size), Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Order> result = orderRepository.findAll(spec, pageable);
        log.info("Total result: {}", result.getTotalElements());


        Map<Long, String> emailsByUserId = emailsFor(result.getContent().stream().map(Order::getUserId).distinct().toList());

        log.info("Emails for userId: {}", emailsByUserId.size());

        return PageResponse.from(result.map(o -> OrderAdminSummaryResponse.fromEntity(o, emailsByUserId.get(o.getUserId()))));
    }

    @Transactional
    public OrderDetailsResponse updateStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: "+orderId));

        Set<OrderStatus> allowed = ALLOWED_TRANSITIONS.getOrDefault(order.getStatus(), Set.of());

        if (!allowed.contains(newStatus)){
            throw new BadRequestException(
                    "Cannot move an order from " + order.getStatus() + " to " + newStatus
                            + " (allowed: " + (allowed.isEmpty() ? "none — terminal state" : allowed) + ")");
        }

        if (newStatus == OrderStatus.CANCELED) {
            orderService.restock(order);
        }

        order.setStatus(newStatus);
        orderRepository.save(order);

        return orderService.toDetailsResponse(order);
    }

    // -----helpers------

    private Map<Long, String> emailsFor(List<Long> userIds) {
        log.info("Emails for userIds: {}", userIds);
        if (userIds.isEmpty()) return Map.of();

        Map<Long, String> result = new HashMap<>();
        for (User user : userRepository.findAllById(userIds)) {
            result.put(user.getId(), user.getEmail());
        }
        return result;
    }


    private int clampSize(int size) {
        if (size <= 0) return 20;

        return Math.min(size, 100);
    }
}
