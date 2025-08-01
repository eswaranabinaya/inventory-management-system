package com.inventory.service;

import com.inventory.dto.PurchaseOrderRequestDTO;
import com.inventory.dto.PurchaseOrderResponseDTO;
import com.inventory.dto.PurchaseOrderFulfillmentRequestDTO;
import com.inventory.model.PurchaseOrder;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import com.inventory.model.Inventory;
import com.inventory.repository.PurchaseOrderRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.WarehouseRepository;
import com.inventory.repository.InventoryRepository;
import com.inventory.service.StockAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseOrderServiceImpl implements PurchaseOrderService {
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final InventoryRepository inventoryRepository;
    private final StockAlertService stockAlertService;

    @Override
    public PurchaseOrderResponseDTO createPurchaseOrder(PurchaseOrderRequestDTO requestDTO) {
        PurchaseOrder po = PurchaseOrder.builder()
                .supplierName(requestDTO.getSupplierName())
                .productName(requestDTO.getProductName())
                .warehouseName(requestDTO.getWarehouseName())
                .quantity(requestDTO.getQuantity())
                .orderDate(LocalDateTime.now())
                .userId(requestDTO.getUserId())
                .status(PurchaseOrder.Status.PENDING)
                .build();
        po = purchaseOrderRepository.save(po);
        return toResponseDTO(po);
    }

    @Override
    public PurchaseOrderResponseDTO getPurchaseOrder(UUID id) {
        PurchaseOrder po = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase order not found"));
        return toResponseDTO(po);
    }

    @Override
    public List<PurchaseOrderResponseDTO> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchaseOrderResponseDTO fulfillPurchaseOrder(UUID id, PurchaseOrderFulfillmentRequestDTO requestDTO) {
        PurchaseOrder po = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase order not found"));
        if (po.getStatus() == PurchaseOrder.Status.RECEIVED) {
            throw new RuntimeException("Purchase order already fulfilled");
        }
        // Update inventory
        Product product = productRepository.findByName(po.getProductName())
                .orElseThrow(() -> new RuntimeException("Product not found: " + po.getProductName()));
        Warehouse warehouse = warehouseRepository.findByName(po.getWarehouseName())
                .orElseThrow(() -> new RuntimeException("Warehouse not found: " + po.getWarehouseName()));
        Inventory inventory = inventoryRepository.findByProductAndWarehouse(product, warehouse)
                .orElse(null);
        if (inventory == null) {
            inventory = Inventory.builder()
                    .product(product)
                    .warehouse(warehouse)
                    .quantity(po.getQuantity())
                    .build();
        } else {
            inventory.setQuantity(inventory.getQuantity() + po.getQuantity());
        }
        inventoryRepository.save(inventory);
        stockAlertService.createAlertIfLowStock(inventory);
        // Update PO status
        po.setStatus(PurchaseOrder.Status.RECEIVED);
        po.setReceivedAt(LocalDateTime.now());
        po.setReceivedBy(requestDTO.getReceivedBy());
        PurchaseOrder savedPo = purchaseOrderRepository.save(po);
        return toResponseDTO(savedPo);
    }

    private PurchaseOrderResponseDTO toResponseDTO(PurchaseOrder po) {
        PurchaseOrderResponseDTO dto = new PurchaseOrderResponseDTO();
        dto.setId(po.getId());
        dto.setSupplierName(po.getSupplierName());
        dto.setProductName(po.getProductName());
        dto.setWarehouseName(po.getWarehouseName());
        dto.setQuantity(po.getQuantity());
        dto.setOrderDate(po.getOrderDate());
        dto.setUserId(po.getUserId());
        dto.setStatus(po.getStatus().name());
        dto.setReceivedAt(po.getReceivedAt());
        dto.setReceivedBy(po.getReceivedBy());
        return dto;
    }
}