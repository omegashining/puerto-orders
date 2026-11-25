package com.puerto.orders.config;

import com.puerto.orders.dto.AddressDto;
import com.puerto.orders.dto.OrderCreateRequest;
import com.puerto.orders.dto.OrderItemDto;
import com.puerto.orders.dto.OrderResponse;
import com.puerto.orders.dto.UserRequest;
import com.puerto.orders.dto.UserResponse;
import com.puerto.orders.model.OrderStatus;
import com.puerto.orders.repository.UserRepository;
import com.puerto.orders.service.OrderService;
import com.puerto.orders.service.UserService;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Carga datos de prueba solo con el perfil "local" y solo si la base está vacía.
 * Se usan los servicios para que los datos pasen por las mismas reglas.
 */
@Slf4j
@Component
@Profile("local")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final int ORDERS_TO_CREATE = 30;

    private static final String[][] USERS = {
            {"María", "González", "López", "maria.gonzalez@example.com"},
            {"José", "Hernández", "Martínez", "jose.hernandez@example.com"},
            {"Guadalupe", "Ramírez", "Torres", "guadalupe.ramirez@example.com"},
            {"Juan", "Pérez", "Sánchez", "juan.perez@example.com"},
            {"Fernanda", "Flores", "Rivera", "fernanda.flores@example.com"},
            {"Luis", "García", "Morales", "luis.garcia@example.com"},
            {"Sofía", "Cruz", "Reyes", "sofia.cruz@example.com"},
            {"Carlos", "Mendoza", "Ortiz", "carlos.mendoza@example.com"},
            {"Valeria", "Jiménez", "Castillo", "valeria.jimenez@example.com"},
            {"Miguel", "Vázquez", "Romero", "miguel.vazquez@example.com"},
            {"Daniela", "Aguilar", "Navarro", "daniela.aguilar@example.com"},
            {"Ricardo", "Domínguez", "Salazar", "ricardo.dominguez@example.com"}
    };

    private static final String[][] ADDRESSES = {
            {"Av. Insurgentes Sur", "1602", "Crédito Constructor", "Benito Juárez", "Ciudad de México", "03940"},
            {"Calle Durango", "263", "Roma Norte", "Cuauhtémoc", "Ciudad de México", "06700"},
            {"Av. Vallarta", "3959", "Don Bosco Vallarta", "Zapopan", "Jalisco", "45049"},
            {"Av. Constitución", "2050", "Obispado", "Monterrey", "Nuevo León", "64060"},
            {"Blvd. Kukulcán", "12.5", "Zona Hotelera", "Benito Juárez", "Quintana Roo", "77500"},
            {"Av. Juárez", "2915", "La Paz", "Puebla", "Puebla", "72160"}
    };

    private static final String[][] PRODUCTS = {
            {"1094538712", "18999.00"},
            {"1102877345", "2499.00"},
            {"1087123498", "799.50"},
            {"1115590231", "12499.00"},
            {"1099034417", "349.90"},
            {"1120458876", "5299.00"},
            {"1078812230", "1599.00"},
            {"1133207719", "26999.00"},
            {"1091176654", "899.00"},
            {"1104489902", "4199.00"}
    };

    private static final OrderStatus[][] STATUS_FLOWS = {
            {},
            {OrderStatus.PAID},
            {OrderStatus.PAID, OrderStatus.SHIPPED},
            {OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED},
            {OrderStatus.CANCELLED},
            {OrderStatus.PAID, OrderStatus.CANCELLED}
    };

    private final UserRepository userRepository;
    private final UserService userService;
    private final OrderService orderService;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Ya existen datos, se omite la carga de datos de prueba");
            return;
        }

        Random random = new Random(42);
        List<UserResponse> users = createUsers();

        for (int i = 0; i < ORDERS_TO_CREATE; i++) {
            UserResponse user = users.get(random.nextInt(users.size()));
            OrderResponse order = orderService.create(
                    new OrderCreateRequest(user.id(), null, randomItems(random)));

            for (OrderStatus status : STATUS_FLOWS[random.nextInt(STATUS_FLOWS.length)]) {
                orderService.updateStatus(order.id(), status);
            }
        }

        log.info("Datos de prueba cargados: {} usuarios y {} pedidos", users.size(), ORDERS_TO_CREATE);
    }

    private List<UserResponse> createUsers() {
        List<UserResponse> users = new ArrayList<>();
        for (int i = 0; i < USERS.length; i++) {
            String[] u = USERS[i];
            String[] a = ADDRESSES[i % ADDRESSES.length];
            AddressDto address = new AddressDto(a[0], a[1], null, a[2], a[3], a[4], a[5]);
            users.add(userService.create(new UserRequest(u[0], u[1], u[2], u[3], address)));
        }
        return users;
    }

    private List<OrderItemDto> randomItems(Random random) {
        List<Integer> indexes = new ArrayList<>(IntStream.range(0, PRODUCTS.length).boxed().toList());
        Collections.shuffle(indexes, random);
        int itemCount = 1 + random.nextInt(3);

        return indexes.subList(0, itemCount).stream()
                .map(index -> new OrderItemDto(
                        PRODUCTS[index][0],
                        1 + random.nextInt(3),
                        new BigDecimal(PRODUCTS[index][1])))
                .toList();
    }
}
