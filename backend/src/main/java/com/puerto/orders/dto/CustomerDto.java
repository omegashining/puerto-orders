package com.puerto.orders.dto;

public record CustomerDto(
        String firstName,
        String lastName,
        String secondLastName,
        String fullName,
        String email) {
}
