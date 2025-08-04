package com.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.dto.PurchaseOrderRequestDTO;
import com.inventory.dto.PurchaseOrderResponseDTO;
import com.inventory.dto.PurchaseOrderFulfillmentRequestDTO;
import com.inventory.service.PurchaseOrderService;
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
@WebMvcTest(PurchaseOrderController.class)
class PurchaseOrderControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private PurchaseOrderService purchaseOrderService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("POST /api/purchase-orders - success")
    void createPurchaseOrder_Success() throws Exception {
        PurchaseOrderRequestDTO request = new PurchaseOrderRequestDTO();
        request.setSupplierName("Supplier");
        request.setProductName("Product");
        request.setWarehouseName("Warehouse");
        request.setQuantity(10);
        request.setUserId(UUID.randomUUID());
        PurchaseOrderResponseDTO response = new PurchaseOrderResponseDTO();
        response.setId(UUID.randomUUID());
        response.setSupplierName(request.getSupplierName());
        Mockito.when(purchaseOrderService.createPurchaseOrder(any(PurchaseOrderRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/purchase-orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.supplierName").value(request.getSupplierName()));
    }

    @Test
    @DisplayName("GET /api/purchase-orders/{id} - success")
    void getPurchaseOrderById_Success() throws Exception {
        UUID id = UUID.randomUUID();
        PurchaseOrderResponseDTO response = new PurchaseOrderResponseDTO();
        response.setId(id);
        response.setSupplierName("Supplier");
        Mockito.when(purchaseOrderService.getPurchaseOrder(id)).thenReturn(response);
        mockMvc.perform(get("/api/purchase-orders/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    @DisplayName("GET /api/purchase-orders - success")
    void getAllPurchaseOrders_Success() throws Exception {
        PurchaseOrderResponseDTO response = new PurchaseOrderResponseDTO();
        response.setId(UUID.randomUUID());
        response.setSupplierName("Supplier");
        Mockito.when(purchaseOrderService.getAllPurchaseOrders()).thenReturn(List.of(response));
        mockMvc.perform(get("/api/purchase-orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].supplierName").value("Supplier"));
    }

    @Test
    @DisplayName("POST /api/purchase-orders/{id}/fulfill - success")
    void fulfillPurchaseOrder_Success() throws Exception {
        UUID id = UUID.randomUUID();
        PurchaseOrderFulfillmentRequestDTO fulfillRequest = new PurchaseOrderFulfillmentRequestDTO();
        fulfillRequest.setReceivedBy("user");
        PurchaseOrderResponseDTO response = new PurchaseOrderResponseDTO();
        response.setId(id);
        response.setStatus("RECEIVED");
        Mockito.when(purchaseOrderService.fulfillPurchaseOrder(eq(id), any(PurchaseOrderFulfillmentRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/purchase-orders/{id}/fulfill", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(fulfillRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("RECEIVED"));
    }
}