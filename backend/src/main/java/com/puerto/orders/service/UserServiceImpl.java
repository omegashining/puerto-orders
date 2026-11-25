package com.puerto.orders.service;

import com.puerto.orders.dto.PageResponse;
import com.puerto.orders.dto.UserRequest;
import com.puerto.orders.dto.UserResponse;
import com.puerto.orders.exception.ConflictException;
import com.puerto.orders.exception.ResourceNotFoundException;
import com.puerto.orders.mapper.UserMapper;
import com.puerto.orders.model.User;
import com.puerto.orders.repository.OrderRepository;
import com.puerto.orders.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponse create(UserRequest request) {
        User user = userMapper.toEntity(request);
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ConflictException("Ya existe un usuario con el correo " + user.getEmail());
        }
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public UserResponse findById(String id) {
        return userMapper.toResponse(getOrThrow(id));
    }

    @Override
    public PageResponse<UserResponse> findAll(Pageable pageable) {
        return PageResponse.from(userRepository.findAll(pageable).map(userMapper::toResponse));
    }

    @Override
    public UserResponse update(String id, UserRequest request) {
        User user = getOrThrow(id);
        String email = UserMapper.normalizeEmail(request.email());
        if (userRepository.existsByEmailAndIdNot(email, id)) {
            throw new ConflictException("Ya existe otro usuario con el correo " + email);
        }
        userMapper.updateEntity(user, request);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    public void delete(String id) {
        User user = getOrThrow(id);
        if (orderRepository.existsByUserId(id)) {
            throw new ConflictException("No se puede eliminar el usuario porque tiene pedidos asociados");
        }
        userRepository.delete(user);
    }

    private User getOrThrow(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", id));
    }
}
