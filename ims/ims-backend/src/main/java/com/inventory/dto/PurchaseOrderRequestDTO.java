package com.inventory.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class PurchaseOrderRequestDTO {
    private String supplierName;
    private String productName;
    private String warehouseName;
    private Integer quantity;
    private UUID userId;
}