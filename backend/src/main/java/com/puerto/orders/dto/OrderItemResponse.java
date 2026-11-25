package com.puerto.orders.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        String productCode,
        Integer quantity,
        BigDecimal price,
        BigDecimal subtotal) {
}
