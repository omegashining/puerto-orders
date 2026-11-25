package com.puerto.orders.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Schema(description = "Dirección de envío")
public record AddressDto(
        @Schema(example = "Insurgentes Sur")
        @NotBlank(message = "La calle es obligatoria") @Size(max = 120)
        String street,

        @Schema(example = "1200")
        @NotBlank(message = "El número exterior es obligatorio") @Size(max = 20)
        String externalNumber,

        @Schema(example = "Piso 4")
        @Size(max = 20)
        String internalNumber,

        @Schema(example = "Sonora")
        @NotBlank(message = "La colonia es obligatoria") @Size(max = 80)
        String neighborhood,

        @Schema(example = "Benito Juárez")
        @NotBlank(message = "La alcaldía o municipio es obligatorio") @Size(max = 80)
        String city,

        @Schema(example = "Ciudad de México")
        @NotBlank(message = "El estado es obligatorio") @Size(max = 60)
        String state,

        @Schema(example = "03940")
        @NotBlank(message = "El código postal es obligatorio")
        @Pattern(regexp = "\\d{5}", message = "El código postal debe tener 5 dígitos")
        String zipCode) {
}
