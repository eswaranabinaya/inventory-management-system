package com.inventory.util;

import com.inventory.dto.WarehouseRequestDTO;
import com.inventory.dto.WarehouseResponseDTO;
import com.inventory.model.Warehouse;

public class WarehouseMapper {
    public static Warehouse toEntity(WarehouseRequestDTO dto) {
        if (dto == null) return null;
        return Warehouse.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .build();
    }

    public static WarehouseResponseDTO toResponseDTO(Warehouse warehouse) {
        if (warehouse == null) return null;
        return WarehouseResponseDTO.builder()
                .id(warehouse.getId())
                .name(warehouse.getName())
                .location(warehouse.getLocation())
                .build();
    }
}