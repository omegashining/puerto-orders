package com.puerto.orders.dto;

import java.time.Instant;

public record UserResponse(
        String id,
        String firstName,
        String lastName,
        String secondLastName,
        String fullName,
        String email,
        AddressDto shippingAddress,
        Instant createdAt,
        Instant updatedAt) {
}
