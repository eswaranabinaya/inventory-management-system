package com.inventory.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private UUID id;
    private String name;
    private String sku;
    private String category;
    private BigDecimal price;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}