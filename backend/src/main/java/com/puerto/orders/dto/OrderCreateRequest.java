package com.puerto.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Schema(description = "Datos para crear un pedido")
public record OrderCreateRequest(
        @Schema(description = "Id del usuario que realiza el pedido")
        @NotBlank(message = "El usuario es obligatorio")
        String userId,

        @Schema(description = "Opcional. Si no se envía se usa la dirección registrada del usuario")
        @Valid AddressDto shippingAddress,

        @NotEmpty(message = "El pedido debe tener al menos un producto")
        List<@Valid OrderItemDto> items) {
}
