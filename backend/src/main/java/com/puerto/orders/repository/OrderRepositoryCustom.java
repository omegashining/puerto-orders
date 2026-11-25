package com.puerto.orders.repository;

import com.puerto.orders.model.Order;
import com.puerto.orders.model.OrderStatus;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderRepositoryCustom {
    Page<Order> search(String term, OrderStatus status, Pageable pageable);

    List<Order> suggest(String term, int limit);
}
