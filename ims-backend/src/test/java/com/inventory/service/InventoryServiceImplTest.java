package com.inventory.service;

import com.inventory.dto.InventoryRequestDTO;
import com.inventory.dto.InventoryResponseDTO;
import com.inventory.model.Inventory;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.WarehouseRepository;
import com.inventory.repository.InventoryMovementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryServiceImplTest {
    @Mock InventoryRepository inventoryRepository;
    @Mock ProductRepository productRepository;
    @Mock WarehouseRepository warehouseRepository;
    @Mock StockAlertService stockAlertService;
    @Mock InventoryMovementRepository inventoryMovementRepository;
    @InjectMocks InventoryServiceImpl inventoryService;

    private InventoryRequestDTO requestDTO;
    private Product product;
    private Warehouse warehouse;
    private Inventory inventory;

    @BeforeEach
    void setUp() {
        UUID productId = UUID.randomUUID();
        UUID warehouseId = UUID.randomUUID();
        product = Product.builder().id(productId).name("P").sku("S").build();
        warehouse = Warehouse.builder().id(warehouseId).name("W").build();
        inventory = Inventory.builder().id(1L).product(product).warehouse(warehouse).quantity(10).build();
        requestDTO = InventoryRequestDTO.builder().productId(productId).warehouseId(warehouseId).quantity(10).reorderThreshold(5).build();
    }

    @Test
    @DisplayName("Should create inventory when valid and unique")
    void createInventory_Success() {
        when(productRepository.findById(requestDTO.getProductId())).thenReturn(Optional.of(product));
        when(warehouseRepository.findById(requestDTO.getWarehouseId())).thenReturn(Optional.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.empty());
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(inventory);
        InventoryResponseDTO response = inventoryService.create(requestDTO);
        assertNotNull(response);
        verify(stockAlertService).createAlertIfLowStock(any(Inventory.class));
    }

    @Test
    @DisplayName("Should throw exception if product not found on create")
    void createInventory_ProductNotFound() {
        when(productRepository.findById(requestDTO.getProductId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> inventoryService.create(requestDTO));
    }

    @Test
    @DisplayName("Should throw exception if warehouse not found on create")
    void createInventory_WarehouseNotFound() {
        when(productRepository.findById(requestDTO.getProductId())).thenReturn(Optional.of(product));
        when(warehouseRepository.findById(requestDTO.getWarehouseId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> inventoryService.create(requestDTO));
    }

    @Test
    @DisplayName("Should throw exception if inventory already exists for product and warehouse")
    void createInventory_Duplicate() {
        when(productRepository.findById(requestDTO.getProductId())).thenReturn(Optional.of(product));
        when(warehouseRepository.findById(requestDTO.getWarehouseId())).thenReturn(Optional.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.of(inventory));
        assertThrows(DataIntegrityViolationException.class, () -> inventoryService.create(requestDTO));
    }

    @Test
    @DisplayName("Should get inventory by ID")
    void getById_Success() {
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventory));
        InventoryResponseDTO response = inventoryService.getById(1L);
        assertNotNull(response);
        assertEquals(inventory.getId(), response.getId());
    }

    @Test
    @DisplayName("Should throw exception if inventory not found by ID")
    void getById_NotFound() {
        when(inventoryRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> inventoryService.getById(1L));
    }

    @Test
    @DisplayName("Should update inventory when valid and unique")
    void updateInventory_Success() {
        InventoryRequestDTO updateDTO = InventoryRequestDTO.builder().productId(product.getId()).warehouseId(warehouse.getId()).quantity(20).reorderThreshold(5).build();
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventory));
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        when(warehouseRepository.findById(warehouse.getId())).thenReturn(Optional.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.of(inventory));
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(inventory);
        InventoryResponseDTO response = inventoryService.update(1L, updateDTO);
        assertNotNull(response);
        verify(stockAlertService).createAlertIfLowStock(any(Inventory.class));
    }

    @Test
    @DisplayName("Should throw exception if inventory not found on update")
    void updateInventory_NotFound() {
        when(inventoryRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> inventoryService.update(1L, requestDTO));
    }

    @Test
    @DisplayName("Should throw exception if product not found on update")
    void updateInventory_ProductNotFound() {
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventory));
        when(productRepository.findById(product.getId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> inventoryService.update(1L, requestDTO));
    }

    @Test
    @DisplayName("Should throw exception if warehouse not found on update")
    void updateInventory_WarehouseNotFound() {
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventory));
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        when(warehouseRepository.findById(warehouse.getId())).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> inventoryService.update(1L, requestDTO));
    }

    @Test
    @DisplayName("Should throw exception if duplicate inventory on update")
    void updateInventory_Duplicate() {
        Inventory otherInventory = Inventory.builder().id(2L).product(product).warehouse(warehouse).quantity(5).build();
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventory));
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        when(warehouseRepository.findById(warehouse.getId())).thenReturn(Optional.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.of(otherInventory));
        assertThrows(DataIntegrityViolationException.class, () -> inventoryService.update(1L, requestDTO));
    }

    @Test
    @DisplayName("Should delete inventory when exists")
    void deleteInventory_Success() {
        when(inventoryRepository.existsById(1L)).thenReturn(true);
        doNothing().when(inventoryRepository).deleteById(1L);
        assertDoesNotThrow(() -> inventoryService.delete(1L));
        verify(inventoryRepository).deleteById(1L);
    }

    @Test
    @DisplayName("Should throw exception when deleting non-existent inventory")
    void deleteInventory_NotFound() {
        when(inventoryRepository.existsById(1L)).thenReturn(false);
        assertThrows(EntityNotFoundException.class, () -> inventoryService.delete(1L));
        verify(inventoryRepository, never()).deleteById(1L);
    }
}