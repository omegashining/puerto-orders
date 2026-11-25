package com.puerto.orders.model;

import com.puerto.orders.util.TextNormalizer;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @Indexed(unique = true)
    private String orderNumber;

    @Indexed
    private String userId;

    private Customer customer;

    private Address shippingAddress;

    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @Indexed
    private OrderStatus status;

    private BigDecimal total;

    private String searchText;

    @CreatedDate
    @Indexed
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Version
    private Long version;

    public void recalculateTotal() {
        this.total = items.stream()
                .map(OrderItem::subtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void refreshSearchText() {
        String productCodes = items.stream()
                .map(OrderItem::getProductCode)
                .collect(Collectors.joining(" "));
        String customerName = customer != null ? customer.fullName() : null;
        String customerEmail = customer != null ? customer.getEmail() : null;
        this.searchText = TextNormalizer.normalize(
                TextNormalizer.join(orderNumber, customerName, customerEmail, productCodes));
    }

    public int totalItems() {
        return items == null ? 0 : items.stream().mapToInt(OrderItem::getQuantity).sum();
    }
}
