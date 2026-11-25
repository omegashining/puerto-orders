package com.puerto.orders.dto;

import com.puerto.orders.model.OrderStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Schema(description = "Datos para actualizar un pedido")
public record OrderUpdateRequest(
        @NotNull(message = "La dirección de envío es obligatoria") @Valid
        AddressDto shippingAddress,

        @NotEmpty(message = "El pedido debe tener al menos un producto")
        List<@Valid OrderItemDto> items,

        @NotNull(message = "El estatus es obligatorio")
        OrderStatus status) {
}
