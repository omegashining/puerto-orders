package com.puerto.orders.service;

import com.puerto.orders.dto.OrderCreateRequest;
import com.puerto.orders.dto.OrderResponse;
import com.puerto.orders.dto.OrderSummaryResponse;
import com.puerto.orders.dto.OrderUpdateRequest;
import com.puerto.orders.dto.PageResponse;
import com.puerto.orders.exception.BusinessRuleException;
import com.puerto.orders.exception.ResourceNotFoundException;
import com.puerto.orders.mapper.AddressMapper;
import com.puerto.orders.mapper.OrderMapper;
import com.puerto.orders.model.Address;
import com.puerto.orders.model.Order;
import com.puerto.orders.model.OrderStatus;
import com.puerto.orders.model.User;
import com.puerto.orders.repository.OrderRepository;
import com.puerto.orders.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private static final int MAX_SUGGESTIONS = 20;

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final AddressMapper addressMapper;
    private final OrderNumberGenerator orderNumberGenerator;

    @Override
    public OrderResponse create(OrderCreateRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", request.userId()));

        Address shippingAddress = request.shippingAddress() != null
                ? addressMapper.toEntity(request.shippingAddress())
                : user.getShippingAddress();

        Order order = Order.builder()
                .orderNumber(orderNumberGenerator.next())
                .userId(user.getId())
                .customer(orderMapper.toCustomer(user))
                .shippingAddress(shippingAddress)
                .items(orderMapper.toItems(request.items()))
                .status(OrderStatus.CREATED)
                .build();

        return save(order);
    }

    @Override
    public OrderResponse findById(String id) {
        return orderMapper.toResponse(getOrThrow(id));
    }

    @Override
    public PageResponse<OrderSummaryResponse> search(String term, OrderStatus status, Pageable pageable) {
        return PageResponse.from(orderRepository.search(term, status, pageable).map(orderMapper::toSummary));
    }

    @Override
    public List<OrderSummaryResponse> suggest(String term, int limit) {
        int safeLimit = Math.clamp(limit, 1, MAX_SUGGESTIONS);
        return orderRepository.suggest(term, safeLimit).stream()
                .map(orderMapper::toSummary)
                .toList();
    }

    @Override
    public OrderResponse update(String id, OrderUpdateRequest request) {
        Order order = getOrThrow(id);
        validateTransition(order.getStatus(), request.status());

        order.setShippingAddress(addressMapper.toEntity(request.shippingAddress()));
        order.setItems(orderMapper.toItems(request.items()));
        order.setStatus(request.status());
        return save(order);
    }

    @Override
    public OrderResponse updateStatus(String id, OrderStatus status) {
        Order order = getOrThrow(id);
        validateTransition(order.getStatus(), status);
        order.setStatus(status);
        return save(order);
    }

    @Override
    public void delete(String id) {
        orderRepository.delete(getOrThrow(id));
    }

    private OrderResponse save(Order order) {
        order.recalculateTotal();
        order.refreshSearchText();
        return orderMapper.toResponse(orderRepository.save(order));
    }

    private void validateTransition(OrderStatus current, OrderStatus target) {
        if (!current.canTransitionTo(target)) {
            throw new BusinessRuleException(
                    "No se puede cambiar el estatus del pedido de %s a %s".formatted(current, target));
        }
    }

    private Order getOrThrow(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido", id));
    }
}
