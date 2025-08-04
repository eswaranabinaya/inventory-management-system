package com.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.dto.InventoryRequestDTO;
import com.inventory.dto.InventoryResponseDTO;
import com.inventory.service.InventoryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(InventoryController.class)
class InventoryControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private InventoryService inventoryService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("POST /api/inventory - success")
    void createInventory_Success() throws Exception {
        InventoryRequestDTO request = InventoryRequestDTO.builder()
                .productId(java.util.UUID.randomUUID())
                .warehouseId(java.util.UUID.randomUUID())
                .quantity(10)
                .reorderThreshold(5)
                .build();
        InventoryResponseDTO response = InventoryResponseDTO.builder()
                .id(1L)
                .productId(request.getProductId())
                .warehouseId(request.getWarehouseId())
                .quantity(request.getQuantity())
                .reorderThreshold(request.getReorderThreshold())
                .build();
        Mockito.when(inventoryService.create(any(InventoryRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @DisplayName("POST /api/inventory - validation error")
    void createInventory_ValidationError() throws Exception {
        InventoryRequestDTO request = InventoryRequestDTO.builder().build();
        mockMvc.perform(post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/inventory - success")
    void getAllInventory_Success() throws Exception {
        InventoryResponseDTO response = InventoryResponseDTO.builder()
                .id(1L)
                .productId(java.util.UUID.randomUUID())
                .warehouseId(java.util.UUID.randomUUID())
                .quantity(10)
                .reorderThreshold(5)
                .build();
        Mockito.when(inventoryService.getAll()).thenReturn(List.of(response));
        mockMvc.perform(get("/api/inventory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L));
    }

    @Test
    @DisplayName("GET /api/inventory/{id} - success")
    void getInventoryById_Success() throws Exception {
        InventoryResponseDTO response = InventoryResponseDTO.builder()
                .id(1L)
                .productId(java.util.UUID.randomUUID())
                .warehouseId(java.util.UUID.randomUUID())
                .quantity(10)
                .reorderThreshold(5)
                .build();
        Mockito.when(inventoryService.getById(1L)).thenReturn(response);
        mockMvc.perform(get("/api/inventory/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @DisplayName("PUT /api/inventory/{id} - success")
    void updateInventory_Success() throws Exception {
        InventoryRequestDTO request = InventoryRequestDTO.builder()
                .productId(java.util.UUID.randomUUID())
                .warehouseId(java.util.UUID.randomUUID())
                .quantity(20)
                .reorderThreshold(10)
                .build();
        InventoryResponseDTO response = InventoryResponseDTO.builder()
                .id(1L)
                .productId(request.getProductId())
                .warehouseId(request.getWarehouseId())
                .quantity(request.getQuantity())
                .reorderThreshold(request.getReorderThreshold())
                .build();
        Mockito.when(inventoryService.update(eq(1L), any(InventoryRequestDTO.class))).thenReturn(response);
        mockMvc.perform(put("/api/inventory/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantity").value(20));
    }

    @Test
    @DisplayName("DELETE /api/inventory/{id} - success")
    void deleteInventory_Success() throws Exception {
        Mockito.doNothing().when(inventoryService).delete(1L);
        mockMvc.perform(delete("/api/inventory/{id}", 1L))
                .andExpect(status().isNoContent());
    }
}