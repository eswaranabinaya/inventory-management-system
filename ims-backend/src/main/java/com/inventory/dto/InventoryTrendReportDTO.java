package com.inventory.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Inventory Trend Report DTO")
public class InventoryTrendReportDTO {
    @Schema(description = "Product ID")
    private Long productId;

    @Schema(description = "Product Name")
    private String productName;

    @Schema(description = "Warehouse ID")
    private Long warehouseId;

    @Schema(description = "Warehouse Name")
    private String warehouseName;

    @Schema(description = "Date (trend point)")
    private String date;

    @Schema(description = "Quantity On Hand at date")
    private BigDecimal quantityOnHand;
}