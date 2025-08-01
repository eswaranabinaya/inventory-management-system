package com.inventory.util;

import com.inventory.dto.InventoryRequestDTO;
import com.inventory.dto.InventoryResponseDTO;
import com.inventory.model.Inventory;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;

import java.util.UUID;

public class InventoryMapper {
    public static Inventory toEntity(InventoryRequestDTO dto, Product product, Warehouse warehouse) {
        if (dto == null || product == null || warehouse == null) return null;
        return Inventory.builder()
                .product(product)
                .warehouse(warehouse)
                .quantity(dto.getQuantity())
                .reorderThreshold(dto.getReorderThreshold() != null ? dto.getReorderThreshold() : 10)
                .build();
    }

    public static InventoryResponseDTO toResponseDTO(Inventory inventory) {
        if (inventory == null) return null;
        return InventoryResponseDTO.builder()
                .id(inventory.getId())
                .productId(inventory.getProduct().getId())
                .productName(inventory.getProduct().getName())
                .warehouseId(inventory.getWarehouse().getId())
                .warehouseName(inventory.getWarehouse().getName())
                .quantity(inventory.getQuantity())
                .reorderThreshold(inventory.getReorderThreshold())
                .createdAt(inventory.getCreatedAt())
                .updatedAt(inventory.getUpdatedAt())
                .build();
    }
}