package com.puerto.orders.mapper;

import com.puerto.orders.dto.CustomerDto;
import com.puerto.orders.dto.OrderItemDto;
import com.puerto.orders.dto.OrderItemResponse;
import com.puerto.orders.dto.OrderResponse;
import com.puerto.orders.dto.OrderSummaryResponse;
import com.puerto.orders.model.Customer;
import com.puerto.orders.model.Order;
import com.puerto.orders.model.OrderItem;
import com.puerto.orders.model.User;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final AddressMapper addressMapper;

    public Customer toCustomer(User user) {
        return Customer.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .secondLastName(user.getSecondLastName())
                .email(user.getEmail())
                .build();
    }

    public List<OrderItem> toItems(List<OrderItemDto> items) {
        return items.stream()
                .map(item -> OrderItem.builder()
                        .productCode(item.productCode().trim())
                        .quantity(item.quantity())
                        .price(item.price().setScale(2, RoundingMode.HALF_UP))
                        .build())
                .collect(Collectors.toCollection(ArrayList::new));
    }

    public OrderResponse toResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getProductCode(), item.getQuantity(), item.getPrice(), item.subtotal()))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getOrderNumber(),
                order.getUserId(),
                toCustomerDto(order.getCustomer()),
                addressMapper.toDto(order.getShippingAddress()),
                items,
                order.totalItems(),
                order.getTotal(),
                order.getStatus(),
                order.getCreatedAt(),
                order.getUpdatedAt());
    }

    public OrderSummaryResponse toSummary(Order order) {
        Customer customer = order.getCustomer();
        return new OrderSummaryResponse(
                order.getId(),
                order.getOrderNumber(),
                customer != null ? customer.fullName() : null,
                customer != null ? customer.getEmail() : null,
                order.getStatus(),
                order.getTotal(),
                order.totalItems(),
                order.getCreatedAt());
    }

    private CustomerDto toCustomerDto(Customer customer) {
        if (customer == null) {
            return null;
        }
        return new CustomerDto(
                customer.getFirstName(),
                customer.getLastName(),
                customer.getSecondLastName(),
                customer.fullName(),
                customer.getEmail());
    }
}
