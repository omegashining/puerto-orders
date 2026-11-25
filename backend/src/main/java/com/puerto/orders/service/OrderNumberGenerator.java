package com.puerto.orders.service;

import com.puerto.orders.repository.OrderRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderNumberGenerator {
    private static final ZoneId ZONE = ZoneId.of("America/Mexico_City");
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyMMdd");

    private final OrderRepository orderRepository;

    public String next() {
        String candidate;
        do {
            candidate = "LIV-%s-%05d".formatted(
                    LocalDate.now(ZONE).format(DATE_FORMAT),
                    ThreadLocalRandom.current().nextInt(100_000));
        } while (orderRepository.existsByOrderNumber(candidate));
        return candidate;
    }
}
