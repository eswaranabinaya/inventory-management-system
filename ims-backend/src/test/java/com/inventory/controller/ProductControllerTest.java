package com.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.dto.ProductRequestDTO;
import com.inventory.dto.ProductResponseDTO;
import com.inventory.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(ProductController.class)
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private ProductService productService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("POST /api/products - success")
    void createProduct_Success() throws Exception {
        ProductRequestDTO request = ProductRequestDTO.builder()
                .name("Test Product")
                .sku("SKU123")
                .category("Category1")
                .price(BigDecimal.valueOf(100.0))
                .description("A test product")
                .build();
        ProductResponseDTO response = ProductResponseDTO.builder()
                .id(UUID.randomUUID())
                .name(request.getName())
                .sku(request.getSku())
                .category(request.getCategory())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
        Mockito.when(productService.create(any(ProductRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value(request.getName()));
    }

    @Test
    @DisplayName("POST /api/products - validation error")
    void createProduct_ValidationError() throws Exception {
        ProductRequestDTO request = ProductRequestDTO.builder()
                .name("") // Invalid: blank
                .sku("") // Invalid: blank
                .price(null) // Invalid: null
                .build();
        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/products - success")
    void getAllProducts_Success() throws Exception {
        ProductResponseDTO response = ProductResponseDTO.builder()
                .id(UUID.randomUUID())
                .name("Test Product")
                .sku("SKU123")
                .category("Category1")
                .price(BigDecimal.valueOf(100.0))
                .description("A test product")
                .build();
        Mockito.when(productService.getAll()).thenReturn(List.of(response));
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Product"));
    }

    @Test
    @DisplayName("GET /api/products/{id} - success")
    void getProductById_Success() throws Exception {
        UUID id = UUID.randomUUID();
        ProductResponseDTO response = ProductResponseDTO.builder()
                .id(id)
                .name("Test Product")
                .sku("SKU123")
                .category("Category1")
                .price(BigDecimal.valueOf(100.0))
                .description("A test product")
                .build();
        Mockito.when(productService.getById(id)).thenReturn(response);
        mockMvc.perform(get("/api/products/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()));
    }

    @Test
    @DisplayName("PUT /api/products/{id} - success")
    void updateProduct_Success() throws Exception {
        UUID id = UUID.randomUUID();
        ProductRequestDTO request = ProductRequestDTO.builder()
                .name("Updated Product")
                .sku("SKU999")
                .category("Category2")
                .price(BigDecimal.valueOf(200.0))
                .description("Updated desc")
                .build();
        ProductResponseDTO response = ProductResponseDTO.builder()
                .id(id)
                .name(request.getName())
                .sku(request.getSku())
                .category(request.getCategory())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
        Mockito.when(productService.update(eq(id), any(ProductRequestDTO.class))).thenReturn(response);
        mockMvc.perform(put("/api/products/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(request.getName()));
    }

    @Test
    @DisplayName("DELETE /api/products/{id} - success")
    void deleteProduct_Success() throws Exception {
        UUID id = UUID.randomUUID();
        Mockito.doNothing().when(productService).delete(id);
        mockMvc.perform(delete("/api/products/{id}", id))
                .andExpect(status().isNoContent());
    }
}