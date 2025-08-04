package com.inventory.controller;

import com.inventory.dto.InventoryTurnoverReportDTO;
import com.inventory.dto.StockValuationReportDTO;
import com.inventory.dto.InventoryTrendReportDTO;
import com.inventory.service.ReportingService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(ReportingController.class)
class ReportingControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ReportingService reportingService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("GET /api/reports/inventory-turnover - success")
    void getInventoryTurnover_Success() throws Exception {
        InventoryTurnoverReportDTO dto = InventoryTurnoverReportDTO.builder()
                .productId(UUID.randomUUID())
                .productName("P")
                .warehouseId(UUID.randomUUID())
                .warehouseName("W")
                .periodStart(LocalDate.now().minusDays(7).toString())
                .periodEnd(LocalDate.now().toString())
                .turnoverRatio(BigDecimal.ONE)
                .costOfGoodsSold(BigDecimal.TEN)
                .averageInventory(BigDecimal.TEN)
                .unitCost(BigDecimal.ONE)
                .build();
        Mockito.when(reportingService.getInventoryTurnover(any(), any(), any(), any())).thenReturn(List.of(dto));
        mockMvc.perform(get("/api/reports/inventory-turnover")
                .param("startDate", LocalDate.now().minusDays(7).toString())
                .param("endDate", LocalDate.now().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productName").value("P"));
    }

    @Test
    @DisplayName("GET /api/reports/stock-valuation - success")
    void getStockValuation_Success() throws Exception {
        StockValuationReportDTO dto = StockValuationReportDTO.builder()
                .productId(1L)
                .productName("P")
                .warehouseId(1L)
                .warehouseName("W")
                .quantityOnHand(BigDecimal.TEN)
                .unitCost(BigDecimal.ONE)
                .totalValue(BigDecimal.TEN)
                .build();
        Mockito.when(reportingService.getStockValuation(any(), any())).thenReturn(List.of(dto));
        mockMvc.perform(get("/api/reports/stock-valuation"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productName").value("P"));
    }

    @Test
    @DisplayName("GET /api/reports/inventory-trends - success")
    void getInventoryTrends_Success() throws Exception {
        InventoryTrendReportDTO dto = InventoryTrendReportDTO.builder()
                .productId(1L)
                .productName("P")
                .warehouseId(1L)
                .warehouseName("W")
                .date(LocalDate.now().toString())
                .quantityOnHand(BigDecimal.TEN)
                .build();
        Mockito.when(reportingService.getInventoryTrends(any(), any(), any(), any())).thenReturn(List.of(dto));
        mockMvc.perform(get("/api/reports/inventory-trends")
                .param("startDate", LocalDate.now().minusDays(7).toString())
                .param("endDate", LocalDate.now().toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productName").value("P"));
    }
}