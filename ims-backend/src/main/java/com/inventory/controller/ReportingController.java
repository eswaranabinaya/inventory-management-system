package com.inventory.controller;

import com.inventory.dto.InventoryTurnoverReportDTO;
import com.inventory.dto.StockValuationReportDTO;
import com.inventory.dto.InventoryTrendReportDTO;
import com.inventory.service.ReportingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reports")
@Validated
@Tag(name = "Reporting", description = "Reporting Dashboard APIs")
public class ReportingController {
    private final ReportingService reportingService;

    public ReportingController(ReportingService reportingService) {
        this.reportingService = reportingService;
    }

    @GetMapping("/inventory-turnover")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get Inventory Turnover Report")
    public List<InventoryTurnoverReportDTO> getInventoryTurnover(
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) UUID warehouseId,
            @RequestParam @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return reportingService.getInventoryTurnover(productId, warehouseId, startDate, endDate);
    }

    @GetMapping("/stock-valuation")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get Stock Valuation Report")
    public List<StockValuationReportDTO> getStockValuation(
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) UUID warehouseId) {
        return reportingService.getStockValuation(productId, warehouseId);
    }

    @GetMapping("/inventory-trends")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @Operation(summary = "Get Inventory Trends Report")
    public List<InventoryTrendReportDTO> getInventoryTrends(
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) UUID warehouseId,
            @RequestParam @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return reportingService.getInventoryTrends(productId, warehouseId, startDate, endDate);
    }
}