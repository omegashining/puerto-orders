package com.puerto.orders.mapper;

import com.puerto.orders.dto.UserRequest;
import com.puerto.orders.dto.UserResponse;
import com.puerto.orders.model.User;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final AddressMapper addressMapper;

    public User toEntity(UserRequest request) {
        User user = new User();
        updateEntity(user, request);
        return user;
    }

    public void updateEntity(User user, UserRequest request) {
        user.setFirstName(request.firstName().trim());
        user.setLastName(request.lastName().trim());
        user.setSecondLastName(request.secondLastName() == null ? null : request.secondLastName().trim());
        user.setEmail(normalizeEmail(request.email()));
        user.setShippingAddress(addressMapper.toEntity(request.shippingAddress()));
    }

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getSecondLastName(),
                user.fullName(),
                user.getEmail(),
                addressMapper.toDto(user.getShippingAddress()),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }

    public static String normalizeEmail(String email) {
        return email == null ? null : email.trim().toLowerCase(Locale.ROOT);
    }
}
