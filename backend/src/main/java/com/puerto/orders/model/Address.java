package com.puerto.orders.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String street;
    private String externalNumber;
    private String internalNumber;
    private String neighborhood;
    private String city;
    private String state;
    private String zipCode;
}
