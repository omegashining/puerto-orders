package com.puerto.orders.dto;

import com.puerto.orders.model.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;

public record OrderSummaryResponse(
        String id,
        String orderNumber,
        String customerName,
        String customerEmail,
        OrderStatus status,
        BigDecimal total,
        int totalItems,
        Instant createdAt) {
}
