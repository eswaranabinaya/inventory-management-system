package com.inventory.dto;

import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryRequestDTO {
    @NotNull
    private UUID productId;

    @NotNull
    private UUID warehouseId;

    @NotNull
    @Min(0)
    private Integer quantity;

    private Integer reorderThreshold;
}