package com.puerto.orders.mapper;

import com.puerto.orders.dto.AddressDto;
import com.puerto.orders.model.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
    public Address toEntity(AddressDto dto) {
        if (dto == null) {
            return null;
        }
        return Address.builder()
                .street(dto.street())
                .externalNumber(dto.externalNumber())
                .internalNumber(dto.internalNumber())
                .neighborhood(dto.neighborhood())
                .city(dto.city())
                .state(dto.state())
                .zipCode(dto.zipCode())
                .build();
    }

    public AddressDto toDto(Address address) {
        if (address == null) {
            return null;
        }
        return new AddressDto(
                address.getStreet(),
                address.getExternalNumber(),
                address.getInternalNumber(),
                address.getNeighborhood(),
                address.getCity(),
                address.getState(),
                address.getZipCode());
    }
}
