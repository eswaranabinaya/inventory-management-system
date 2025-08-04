package com.inventory.service;

import com.inventory.dto.InventoryTurnoverReportDTO;
import com.inventory.dto.StockValuationReportDTO;
import com.inventory.dto.InventoryTrendReportDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ReportingService {
    List<InventoryTurnoverReportDTO> getInventoryTurnover(UUID productId, UUID warehouseId, LocalDate startDate, LocalDate endDate);
    List<StockValuationReportDTO> getStockValuation(UUID productId, UUID warehouseId);
    List<InventoryTrendReportDTO> getInventoryTrends(UUID productId, UUID warehouseId, LocalDate startDate, LocalDate endDate);
}