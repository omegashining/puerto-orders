package com.puerto.orders.dto;

import com.puerto.orders.model.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderStatusRequest(
        @NotNull(message = "El estatus es obligatorio")
        OrderStatus status) {
}
