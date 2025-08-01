package com.inventory.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PurchaseOrderResponseDTO {
    private UUID id;
    private String supplierName;
    private String productName;
    private String warehouseName;
    private Integer quantity;
    private LocalDateTime orderDate;
    private UUID userId;
    private String status;
    private LocalDateTime receivedAt;
    private String receivedBy;
}