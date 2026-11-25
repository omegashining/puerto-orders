package com.puerto.orders.model;

import com.puerto.orders.util.TextNormalizer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    private String firstName;
    private String lastName;
    private String secondLastName;
    private String email;

    public String fullName() {
        return TextNormalizer.join(firstName, lastName, secondLastName);
    }
}
