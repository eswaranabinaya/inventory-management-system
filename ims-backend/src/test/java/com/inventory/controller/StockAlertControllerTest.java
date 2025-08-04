package com.inventory.controller;

import com.inventory.service.StockAlertService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(StockAlertController.class)
class StockAlertControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private StockAlertService stockAlertService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("GET /api/stock-alerts - success")
    void getActiveAlerts_Success() throws Exception {
        // Mock nested entities for StockAlert
        com.inventory.model.Product product = com.inventory.model.Product.builder()
                .id(java.util.UUID.randomUUID())
                .name("P")
                .sku("SKU123")
                .build();
        com.inventory.model.Warehouse warehouse = com.inventory.model.Warehouse.builder()
                .id(java.util.UUID.randomUUID())
                .name("W")
                .location("Loc1")
                .build();
        com.inventory.model.Inventory inventory = com.inventory.model.Inventory.builder()
                .id(1L)
                .product(product)
                .warehouse(warehouse)
                .quantity(5)
                .reorderThreshold(10)
                .build();
        com.inventory.model.StockAlert alert = com.inventory.model.StockAlert.builder()
                .id(1L)
                .inventory(inventory)
                .quantity(5)
                .threshold(10)
                .createdAt(java.time.LocalDateTime.now())
                .resolved(false)
                .build();
        Mockito.when(stockAlertService.getActiveAlerts()).thenReturn(List.of(alert));
        mockMvc.perform(get("/api/stock-alerts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));
    }

    @Test
    @DisplayName("POST /api/stock-alerts/{id}/resolve - success")
    void resolveAlert_Success() throws Exception {
        Mockito.doNothing().when(stockAlertService).resolveAlert(anyLong());
        mockMvc.perform(post("/api/stock-alerts/{id}/resolve", 1L))
                .andExpect(status().isOk());
    }
}