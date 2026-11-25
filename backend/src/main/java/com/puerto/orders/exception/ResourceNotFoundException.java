package com.puerto.orders.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, String id) {
        super("%s con id '%s' no encontrado".formatted(resource, id));
    }
}
