package com.inventory.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Inventory Turnover Report DTO")
public class InventoryTurnoverReportDTO {
    @Schema(description = "Product ID")
    private UUID productId;

    @Schema(description = "Product Name")
    private String productName;

    @Schema(description = "Warehouse ID")
    private UUID warehouseId;

    @Schema(description = "Warehouse Name")
    private String warehouseName;

    @Schema(description = "Reporting Period Start")
    private String periodStart;

    @Schema(description = "Reporting Period End")
    private String periodEnd;

    @Schema(description = "Inventory Turnover Ratio")
    private BigDecimal turnoverRatio;

    @Schema(description = "Cost of Goods Sold in period")
    private BigDecimal costOfGoodsSold;

    @Schema(description = "Average Inventory in period")
    private BigDecimal averageInventory;

    @Schema(description = "Unit Cost used for COGS calculation")
    private BigDecimal unitCost;
}