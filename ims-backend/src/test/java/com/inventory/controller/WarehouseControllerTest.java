package com.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.dto.WarehouseRequestDTO;
import com.inventory.dto.WarehouseResponseDTO;
import com.inventory.service.WarehouseService;
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
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(WarehouseController.class)
class WarehouseControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private WarehouseService warehouseService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("POST /api/warehouses - success")
    void createWarehouse_Success() throws Exception {
        WarehouseRequestDTO request = WarehouseRequestDTO.builder()
                .name("Main WH")
                .location("Loc1")
                .build();
        WarehouseResponseDTO response = WarehouseResponseDTO.builder()
                .id(UUID.randomUUID())
                .name(request.getName())
                .location(request.getLocation())
                .build();
        Mockito.when(warehouseService.create(any(WarehouseRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/warehouses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(request.getName()));
    }

    @Test
    @DisplayName("POST /api/warehouses - validation error")
    void createWarehouse_ValidationError() throws Exception {
        WarehouseRequestDTO request = WarehouseRequestDTO.builder().build();
        mockMvc.perform(post("/api/warehouses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/warehouses - success")
    void getAllWarehouses_Success() throws Exception {
        WarehouseResponseDTO response = WarehouseResponseDTO.builder()
                .id(UUID.randomUUID())
                .name("Main WH")
                .location("Loc1")
                .build();
        Mockito.when(warehouseService.getAll()).thenReturn(List.of(response));
        mockMvc.perform(get("/api/warehouses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Main WH"));
    }

    @Test
    @DisplayName("GET /api/warehouses/{id} - success")
    void getWarehouseById_Success() throws Exception {
        UUID id = UUID.randomUUID();
        WarehouseResponseDTO response = WarehouseResponseDTO.builder()
                .id(id)
                .name("Main WH")
                .location("Loc1")
                .build();
        Mockito.when(warehouseService.getById(id)).thenReturn(response);
        mockMvc.perform(get("/api/warehouses/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    @DisplayName("PUT /api/warehouses/{id} - success")
    void updateWarehouse_Success() throws Exception {
        UUID id = UUID.randomUUID();
        WarehouseRequestDTO request = WarehouseRequestDTO.builder()
                .name("Updated WH")
                .location("Loc2")
                .build();
        WarehouseResponseDTO response = WarehouseResponseDTO.builder()
                .id(id)
                .name(request.getName())
                .location(request.getLocation())
                .build();
        Mockito.when(warehouseService.update(eq(id), any(WarehouseRequestDTO.class))).thenReturn(response);
        mockMvc.perform(put("/api/warehouses/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(request.getName()));
    }

    @Test
    @DisplayName("DELETE /api/warehouses/{id} - success")
    void deleteWarehouse_Success() throws Exception {
        UUID id = UUID.randomUUID();
        Mockito.doNothing().when(warehouseService).delete(id);
        mockMvc.perform(delete("/api/warehouses/{id}", id))
                .andExpect(status().isNoContent());
    }
}