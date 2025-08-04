package com.inventory.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponseDTO {
    private Long id;
    private UUID productId;
    private String productName;
    private UUID warehouseId;
    private String warehouseName;
    private Integer quantity;
    private Integer reorderThreshold;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}