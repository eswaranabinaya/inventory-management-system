package com.inventory.service;

import com.inventory.dto.PurchaseOrderRequestDTO;
import com.inventory.dto.PurchaseOrderResponseDTO;
import com.inventory.dto.PurchaseOrderFulfillmentRequestDTO;
import com.inventory.model.PurchaseOrder;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import com.inventory.model.Inventory;
import com.inventory.model.InventoryMovement;
import com.inventory.repository.PurchaseOrderRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.WarehouseRepository;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.InventoryMovementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PurchaseOrderServiceImplTest {
    @Mock PurchaseOrderRepository purchaseOrderRepository;
    @Mock ProductRepository productRepository;
    @Mock WarehouseRepository warehouseRepository;
    @Mock InventoryRepository inventoryRepository;
    @Mock InventoryMovementRepository inventoryMovementRepository;
    @Mock StockAlertService stockAlertService;
    @InjectMocks PurchaseOrderServiceImpl purchaseOrderService;

    private PurchaseOrderRequestDTO requestDTO;
    private PurchaseOrder po;
    private UUID poId;

    @BeforeEach
    void setUp() {
        poId = UUID.randomUUID();
        requestDTO = new PurchaseOrderRequestDTO();
        requestDTO.setSupplierName("Supplier");
        requestDTO.setProductName("Product");
        requestDTO.setWarehouseName("Warehouse");
        requestDTO.setQuantity(10);
        requestDTO.setUserId(UUID.randomUUID());
        po = PurchaseOrder.builder()
                .id(poId)
                .supplierName("Supplier")
                .productName("Product")
                .warehouseName("Warehouse")
                .quantity(10)
                .unitCost(BigDecimal.ZERO)
                .orderDate(LocalDateTime.now())
                .userId(requestDTO.getUserId())
                .status(PurchaseOrder.Status.PENDING)
                .build();
    }

    @Test
    @DisplayName("Should create purchase order")
    void createPurchaseOrder_Success() {
        when(purchaseOrderRepository.save(any(PurchaseOrder.class))).thenReturn(po);
        PurchaseOrderResponseDTO response = purchaseOrderService.createPurchaseOrder(requestDTO);
        assertNotNull(response);
        assertEquals(po.getSupplierName(), response.getSupplierName());
    }

    @Test
    @DisplayName("Should get purchase order by ID")
    void getPurchaseOrder_Success() {
        when(purchaseOrderRepository.findById(poId)).thenReturn(Optional.of(po));
        PurchaseOrderResponseDTO response = purchaseOrderService.getPurchaseOrder(poId);
        assertNotNull(response);
        assertEquals(poId, response.getId());
    }

    @Test
    @DisplayName("Should throw when purchase order not found by ID")
    void getPurchaseOrder_NotFound() {
        when(purchaseOrderRepository.findById(poId)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> purchaseOrderService.getPurchaseOrder(poId));
    }

    @Test
    @DisplayName("Should get all purchase orders")
    void getAllPurchaseOrders_Success() {
        when(purchaseOrderRepository.findAll()).thenReturn(List.of(po));
        List<PurchaseOrderResponseDTO> list = purchaseOrderService.getAllPurchaseOrders();
        assertNotNull(list);
        assertFalse(list.isEmpty());
    }

    @Test
    @DisplayName("Should fulfill purchase order")
    void fulfillPurchaseOrder_Success() {
        PurchaseOrderFulfillmentRequestDTO fulfillDTO = new PurchaseOrderFulfillmentRequestDTO();
        fulfillDTO.setReceivedBy("user");
        Product product = Product.builder().name(po.getProductName()).build();
        Warehouse warehouse = Warehouse.builder().name(po.getWarehouseName()).build();
        Inventory inventory = Inventory.builder().product(product).warehouse(warehouse).quantity(5).build();
        when(purchaseOrderRepository.findById(poId)).thenReturn(Optional.of(po));
        when(productRepository.findByName(po.getProductName())).thenReturn(Optional.of(product));
        when(warehouseRepository.findByName(po.getWarehouseName())).thenReturn(Optional.of(warehouse));
        when(inventoryRepository.findByProductAndWarehouse(product, warehouse)).thenReturn(Optional.of(inventory));
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(inventory);
        when(purchaseOrderRepository.save(any(PurchaseOrder.class))).thenReturn(po);
        PurchaseOrderResponseDTO response = purchaseOrderService.fulfillPurchaseOrder(poId, fulfillDTO);
        assertNotNull(response);
        assertEquals(PurchaseOrder.Status.RECEIVED.name(), response.getStatus());
    }

    @Test
    @DisplayName("Should throw if purchase order not found on fulfill")
    void fulfillPurchaseOrder_NotFound() {
        PurchaseOrderFulfillmentRequestDTO fulfillDTO = new PurchaseOrderFulfillmentRequestDTO();
        fulfillDTO.setReceivedBy("user");
        when(purchaseOrderRepository.findById(poId)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> purchaseOrderService.fulfillPurchaseOrder(poId, fulfillDTO));
    }

    @Test
    @DisplayName("Should throw if already fulfilled")
    void fulfillPurchaseOrder_AlreadyFulfilled() {
        PurchaseOrderFulfillmentRequestDTO fulfillDTO = new PurchaseOrderFulfillmentRequestDTO();
        fulfillDTO.setReceivedBy("user");
        po.setStatus(PurchaseOrder.Status.RECEIVED);
        when(purchaseOrderRepository.findById(poId)).thenReturn(Optional.of(po));
        assertThrows(RuntimeException.class, () -> purchaseOrderService.fulfillPurchaseOrder(poId, fulfillDTO));
    }
}