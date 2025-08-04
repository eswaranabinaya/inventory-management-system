package com.inventory.dto;

import lombok.Data;

@Data
public class StockAlertResponseDTO {
    private Long id;
    private String productName;
    private String warehouseName;
    private Integer quantity;
    private Integer threshold;
    private String createdAt;
    private boolean resolved;
}