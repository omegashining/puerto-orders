package com.puerto.orders.model;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

/**
 * Estatus del pedido con sus transiciones permitidas.
 */
public enum OrderStatus {
    CREATED,
    PAID,
    SHIPPED,
    DELIVERED,
    CANCELLED;

    private static final Map<OrderStatus, Set<OrderStatus>> TRANSITIONS = new EnumMap<>(OrderStatus.class);

    static {
        TRANSITIONS.put(CREATED, EnumSet.of(PAID, CANCELLED));          // CREATED -> PAID | CANCELLED
        TRANSITIONS.put(PAID, EnumSet.of(SHIPPED, CANCELLED));          // PAID    -> SHIPPED | CANCELLED
        TRANSITIONS.put(SHIPPED, EnumSet.of(DELIVERED));                // SHIPPED -> DELIVERED
        TRANSITIONS.put(DELIVERED, EnumSet.noneOf(OrderStatus.class));  // Final
        TRANSITIONS.put(CANCELLED, EnumSet.noneOf(OrderStatus.class));  // Final
    }

    public boolean canTransitionTo(OrderStatus target) {
        return this == target || TRANSITIONS.get(this).contains(target);
    }
}
