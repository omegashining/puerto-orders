package com.puerto.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Datos para crear o actualizar un usuario")
public record UserRequest(
        @Schema(example = "Andrés")
        @NotBlank(message = "El nombre es obligatorio") @Size(max = 60)
        String firstName,

        @Schema(example = "Sánchez")
        @NotBlank(message = "El apellido paterno es obligatorio") @Size(max = 60)
        String lastName,

        @Schema(example = "López")
        @Size(max = 60)
        String secondLastName,

        @Schema(example = "andres.sanchez@domain.com")
        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no tiene un formato válido") @Size(max = 120)
        String email,

        @NotNull(message = "La dirección de envío es obligatoria") @Valid
        AddressDto shippingAddress) {
}
