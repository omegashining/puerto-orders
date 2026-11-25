package com.puerto.orders.repository;

import com.puerto.orders.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, String id);
}
