package com.puerto.orders.service;

import com.puerto.orders.dto.PageResponse;
import com.puerto.orders.dto.UserRequest;
import com.puerto.orders.dto.UserResponse;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserResponse create(UserRequest request);

    UserResponse findById(String id);

    PageResponse<UserResponse> findAll(Pageable pageable);

    UserResponse update(String id, UserRequest request);

    void delete(String id);
}
