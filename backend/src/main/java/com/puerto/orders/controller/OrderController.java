package com.puerto.orders.controller;

import com.puerto.orders.dto.OrderCreateRequest;
import com.puerto.orders.dto.OrderResponse;
import com.puerto.orders.dto.OrderStatusRequest;
import com.puerto.orders.dto.OrderSummaryResponse;
import com.puerto.orders.dto.OrderUpdateRequest;
import com.puerto.orders.dto.PageResponse;
import com.puerto.orders.model.OrderStatus;
import com.puerto.orders.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Pedidos", description = "Gestión de pedidos realizados en la app y el sitio web")
public class OrderController {
    private final OrderService orderService;

    @Operation(summary = "Lista pedidos (paginado) con filtro por texto y estatus")
    @GetMapping
    public PageResponse<OrderSummaryResponse> list(
            @Parameter(description = "Texto a buscar: número de pedido, nombre, correo o código de producto")
            @RequestParam(required = false) String q,
            @Parameter(description = "Filtra por estatus")
            @RequestParam(required = false) OrderStatus status,
            @ParameterObject
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return orderService.search(q, status, pageable);
    }

    @Operation(summary = "Sugerencias para el typeahead",
            description = "Devuelve los pedidos que coinciden con lo escrito. Lista vacía si no hay coincidencias.")
    @GetMapping("/search")
    public List<OrderSummaryResponse> suggestions(
            @Parameter(description = "Término escrito por el usuario", example = "maria")
            @RequestParam String q,
            @Parameter(description = "Máximo de sugerencias (1-20)")
            @RequestParam(defaultValue = "8") int limit) {
        return orderService.suggest(q, limit);
    }

    @Operation(summary = "Consulta el detalle de un pedido")
    @ApiResponse(responseCode = "200", description = "Pedido encontrado")
    @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    @GetMapping("/{id}")
    public OrderResponse get(@PathVariable String id) {
        return orderService.findById(id);
    }

    @Operation(summary = "Crea un pedido")
    @ApiResponse(responseCode = "201", description = "Pedido creado")
    @ApiResponse(responseCode = "400", description = "Datos inválidos")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody OrderCreateRequest request) {
        OrderResponse created = orderService.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @Operation(summary = "Actualiza un pedido (dirección, productos y estatus)")
    @ApiResponse(responseCode = "200", description = "Pedido actualizado")
    @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    @ApiResponse(responseCode = "422", description = "Transición de estatus no permitida")
    @PutMapping("/{id}")
    public OrderResponse update(@PathVariable String id, @Valid @RequestBody OrderUpdateRequest request) {
        return orderService.update(id, request);
    }

    @Operation(summary = "Cambia el estatus de un pedido")
    @ApiResponse(responseCode = "200", description = "Estatus actualizado")
    @ApiResponse(responseCode = "422", description = "Transición de estatus no permitida")
    @PatchMapping("/{id}/status")
    public OrderResponse updateStatus(@PathVariable String id, @Valid @RequestBody OrderStatusRequest request) {
        return orderService.updateStatus(id, request.status());
    }

    @Operation(summary = "Elimina un pedido")
    @ApiResponse(responseCode = "204", description = "Pedido eliminado")
    @ApiResponse(responseCode = "404", description = "Pedido no encontrado")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        orderService.delete(id);
    }
}
