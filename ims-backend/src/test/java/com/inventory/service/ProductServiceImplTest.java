package com.inventory.service;

import com.inventory.dto.ProductRequestDTO;
import com.inventory.dto.ProductResponseDTO;
import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private ProductRequestDTO productRequestDTO;
    private Product product;

    @BeforeEach
    void setUp() {
        productRequestDTO = ProductRequestDTO.builder()
                .name("Test Product")
                .sku("SKU123")
                .category("Category1")
                .price(BigDecimal.valueOf(100.0))
                .description("A test product")
                .build();

        product = Product.builder()
                .id(java.util.UUID.randomUUID())
                .name("Test Product")
                .sku("SKU123")
                .category("Category1")
                .price(BigDecimal.valueOf(100.0))
                .description("A test product")
                .build();
    }

    @Test
    @DisplayName("Should create product when name and SKU are unique")
    void createProduct_Success() {
        when(productRepository.existsByName(productRequestDTO.getName())).thenReturn(false);
        when(productRepository.existsBySku(productRequestDTO.getSku())).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductResponseDTO response = productService.create(productRequestDTO);

        assertNotNull(response);
        assertEquals(product.getName(), response.getName());
        assertEquals(product.getSku(), response.getSku());
        verify(productRepository).save(any(Product.class));
    }

    @Test
    @DisplayName("Should throw exception when product name is duplicate")
    void createProduct_DuplicateName() {
        when(productRepository.existsByName(productRequestDTO.getName())).thenReturn(true);

        assertThrows(DataIntegrityViolationException.class, () ->
                productService.create(productRequestDTO)
        );
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    @DisplayName("Should throw exception when product SKU is duplicate")
    void createProduct_DuplicateSku() {
        when(productRepository.existsByName(productRequestDTO.getName())).thenReturn(false);
        when(productRepository.existsBySku(productRequestDTO.getSku())).thenReturn(true);

        assertThrows(DataIntegrityViolationException.class, () ->
                productService.create(productRequestDTO)
        );
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    @DisplayName("Should return product when found by ID")
    void getById_Success() {
        when(productRepository.findById(product.getId())).thenReturn(java.util.Optional.of(product));
        ProductResponseDTO response = productService.getById(product.getId());
        assertNotNull(response);
        assertEquals(product.getId(), response.getId());
        assertEquals(product.getName(), response.getName());
    }

    @Test
    @DisplayName("Should throw exception when product not found by ID")
    void getById_NotFound() {
        java.util.UUID id = java.util.UUID.randomUUID();
        when(productRepository.findById(id)).thenReturn(java.util.Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> productService.getById(id));
    }

    @Test
    @DisplayName("Should update product when valid and unique")
    void updateProduct_Success() {
        java.util.UUID id = product.getId();
        ProductRequestDTO updateDto = ProductRequestDTO.builder()
                .name("Updated Name")
                .sku("UpdatedSKU")
                .category("UpdatedCat")
                .price(BigDecimal.valueOf(200.0))
                .description("Updated desc")
                .build();
        when(productRepository.findById(id)).thenReturn(java.util.Optional.of(product));
        when(productRepository.existsByName(updateDto.getName())).thenReturn(false);
        when(productRepository.existsBySku(updateDto.getSku())).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenReturn(product);
        ProductResponseDTO response = productService.update(id, updateDto);
        assertNotNull(response);
        assertEquals(updateDto.getName(), response.getName());
        assertEquals(updateDto.getSku(), response.getSku());
    }

    @Test
    @DisplayName("Should throw exception when updating non-existent product")
    void updateProduct_NotFound() {
        java.util.UUID id = java.util.UUID.randomUUID();
        ProductRequestDTO updateDto = ProductRequestDTO.builder()
                .name("Updated Name")
                .sku("UpdatedSKU")
                .category("UpdatedCat")
                .price(BigDecimal.valueOf(200.0))
                .description("Updated desc")
                .build();
        when(productRepository.findById(id)).thenReturn(java.util.Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> productService.update(id, updateDto));
    }

    @Test
    @DisplayName("Should throw exception when updating with duplicate name")
    void updateProduct_DuplicateName() {
        java.util.UUID id = product.getId();
        ProductRequestDTO updateDto = ProductRequestDTO.builder()
                .name("OtherName")
                .sku(product.getSku())
                .category(product.getCategory())
                .price(product.getPrice())
                .description(product.getDescription())
                .build();
        when(productRepository.findById(id)).thenReturn(java.util.Optional.of(product));
        when(productRepository.existsByName(updateDto.getName())).thenReturn(true);
        assertThrows(DataIntegrityViolationException.class, () -> productService.update(id, updateDto));
    }

    @Test
    @DisplayName("Should throw exception when updating with duplicate SKU")
    void updateProduct_DuplicateSku() {
        java.util.UUID id = product.getId();
        ProductRequestDTO updateDto = ProductRequestDTO.builder()
                .name(product.getName())
                .sku("OtherSKU")
                .category(product.getCategory())
                .price(product.getPrice())
                .description(product.getDescription())
                .build();
        when(productRepository.findById(id)).thenReturn(java.util.Optional.of(product));
        when(productRepository.existsBySku(updateDto.getSku())).thenReturn(true);
        assertThrows(DataIntegrityViolationException.class, () -> productService.update(id, updateDto));
    }

    @Test
    @DisplayName("Should delete product when exists")
    void deleteProduct_Success() {
        java.util.UUID id = product.getId();
        when(productRepository.existsById(id)).thenReturn(true);
        doNothing().when(productRepository).deleteById(id);
        assertDoesNotThrow(() -> productService.delete(id));
        verify(productRepository).deleteById(id);
    }

    @Test
    @DisplayName("Should throw exception when deleting non-existent product")
    void deleteProduct_NotFound() {
        java.util.UUID id = java.util.UUID.randomUUID();
        when(productRepository.existsById(id)).thenReturn(false);
        assertThrows(EntityNotFoundException.class, () -> productService.delete(id));
        verify(productRepository, never()).deleteById(id);
    }
}