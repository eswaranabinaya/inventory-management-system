package com.inventory.service;

import com.inventory.dto.InventoryTurnoverReportDTO;
import com.inventory.dto.StockValuationReportDTO;
import com.inventory.dto.InventoryTrendReportDTO;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import com.inventory.model.Inventory;
import com.inventory.model.InventoryMovement;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.PurchaseOrderRepository;
import com.inventory.repository.WarehouseRepository;
import com.inventory.repository.InventoryMovementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReportingServiceImplTest {
    @Mock InventoryRepository inventoryRepository;
    @Mock ProductRepository productRepository;
    @Mock PurchaseOrderRepository purchaseOrderRepository;
    @Mock WarehouseRepository warehouseRepository;
    @Mock InventoryMovementRepository inventoryMovementRepository;
    @InjectMocks ReportingServiceImpl reportingService;

    private Product product;
    private Warehouse warehouse;
    private Inventory inventory;
    private InventoryMovement movement;
    private UUID productId;
    private UUID warehouseId;
    private LocalDate startDate;
    private LocalDate endDate;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();
        warehouseId = UUID.randomUUID();
        product = Product.builder().id(productId).name("P").price(BigDecimal.valueOf(100)).build();
        warehouse = Warehouse.builder().id(warehouseId).name("W").build();
        inventory = Inventory.builder().id(1L).product(product).warehouse(warehouse).quantity(10).build();
        movement = InventoryMovement.builder().product(product).warehouse(warehouse).movementType(InventoryMovement.MovementType.OUTBOUND).quantity(5).unitCost(BigDecimal.valueOf(50)).movementDate(LocalDateTime.now()).build();
        startDate = LocalDate.now().minusDays(7);
        endDate = LocalDate.now();
    }

    @Test
    @DisplayName("Should return inventory turnover report")
    void getInventoryTurnover_Success() {
        when(productRepository.findAll()).thenReturn(List.of(product));
        when(warehouseRepository.findAll()).thenReturn(List.of(warehouse));
        when(inventoryMovementRepository.findAll()).thenReturn(List.of(movement));
        when(inventoryMovementRepository.sumCogsForProductAndWarehouse(any(), any(), any(), any())).thenReturn(BigDecimal.valueOf(500));
        when(inventoryMovementRepository.getInventoryOnHandAt(any(), any(), any())).thenReturn(10);
        List<InventoryTurnoverReportDTO> result = reportingService.getInventoryTurnover(null, null, startDate, endDate);
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }

    @Test
    @DisplayName("Should return stock valuation report")
    void getStockValuation_Success() {
        when(productRepository.findAll()).thenReturn(List.of(product));
        when(warehouseRepository.findAll()).thenReturn(List.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.of(inventory));
        List<StockValuationReportDTO> result = reportingService.getStockValuation(null, null);
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }

    @Test
    @DisplayName("Should return inventory trends report")
    void getInventoryTrends_Success() {
        when(productRepository.findAll()).thenReturn(List.of(product));
        when(warehouseRepository.findAll()).thenReturn(List.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.of(inventory));
        when(inventoryMovementRepository.getInventoryOnHandAt(any(), any(), any())).thenReturn(10);
        List<InventoryTrendReportDTO> result = reportingService.getInventoryTrends(null, null, startDate, endDate);
        assertNotNull(result);
        assertFalse(result.isEmpty());
    }
}