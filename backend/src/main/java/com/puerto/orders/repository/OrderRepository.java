package com.puerto.orders.repository;

import com.puerto.orders.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String>, OrderRepositoryCustom {
    boolean existsByUserId(String userId);

    boolean existsByOrderNumber(String orderNumber);
}
