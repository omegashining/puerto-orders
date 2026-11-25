package com.puerto.orders.dto;

import com.puerto.orders.model.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        String id,
        String orderNumber,
        String userId,
        CustomerDto customer,
        AddressDto shippingAddress,
        List<OrderItemResponse> items,
        int totalItems,
        BigDecimal total,
        OrderStatus status,
        Instant createdAt,
        Instant updatedAt) {
}
