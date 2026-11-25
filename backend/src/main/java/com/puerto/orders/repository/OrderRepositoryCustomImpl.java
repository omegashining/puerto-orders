package com.puerto.orders.repository;

import com.puerto.orders.model.Order;
import com.puerto.orders.model.OrderStatus;
import com.puerto.orders.util.TextNormalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@RequiredArgsConstructor
public class OrderRepositoryCustomImpl implements OrderRepositoryCustom {
    private static final String SEARCH_FIELD = "searchText";

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Order> search(String term, OrderStatus status, Pageable pageable) {
        Query query = new Query();
        buildTermCriteria(term).ifPresent(query::addCriteria);
        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        long total = mongoTemplate.count(query, Order.class);
        List<Order> content = mongoTemplate.find(query.with(pageable), Order.class);
        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public List<Order> suggest(String term, int limit) {
        return buildTermCriteria(term)
                .map(criteria -> new Query(criteria)
                        .with(Sort.by(Sort.Direction.DESC, "createdAt"))
                        .limit(limit))
                .map(query -> mongoTemplate.find(query, Order.class))
                .orElse(List.of());
    }

    private Optional<Criteria> buildTermCriteria(String term) {
        String normalized = TextNormalizer.normalize(term);
        if (normalized.isEmpty()) {
            return Optional.empty();
        }
        Criteria[] tokens = Arrays.stream(normalized.split("\\s+"))
                .map(token -> Criteria.where(SEARCH_FIELD).regex(Pattern.quote(token)))
                .toArray(Criteria[]::new);
        return Optional.of(new Criteria().andOperator(tokens));
    }
}
