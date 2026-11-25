package com.puerto.orders.service;

import com.puerto.orders.dto.OrderCreateRequest;
import com.puerto.orders.dto.OrderResponse;
import com.puerto.orders.dto.OrderSummaryResponse;
import com.puerto.orders.dto.OrderUpdateRequest;
import com.puerto.orders.dto.PageResponse;
import com.puerto.orders.model.OrderStatus;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponse create(OrderCreateRequest request);

    OrderResponse findById(String id);

    PageResponse<OrderSummaryResponse> search(String term, OrderStatus status, Pageable pageable);

    List<OrderSummaryResponse> suggest(String term, int limit);

    OrderResponse update(String id, OrderUpdateRequest request);

    OrderResponse updateStatus(String id, OrderStatus status);

    void delete(String id);
}
