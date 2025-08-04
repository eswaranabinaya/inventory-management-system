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
@Schema(description = "Stock Valuation Report DTO")
public class StockValuationReportDTO {
    @Schema(description = "Product ID")
    private Long productId;

    @Schema(description = "Product Name")
    private String productName;

    @Schema(description = "Warehouse ID")
    private Long warehouseId;

    @Schema(description = "Warehouse Name")
    private String warehouseName;

    @Schema(description = "Quantity On Hand")
    private BigDecimal quantityOnHand;

    @Schema(description = "Unit Cost")
    private BigDecimal unitCost;

    @Schema(description = "Total Value (quantity * unit cost)")
    private BigDecimal totalValue;
}