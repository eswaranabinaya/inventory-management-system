package com.inventory.service;

import com.inventory.dto.InventoryRequestDTO;
import com.inventory.dto.InventoryResponseDTO;
import com.inventory.model.Inventory;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.WarehouseRepository;
import com.inventory.util.InventoryMapper;
import com.inventory.service.StockAlertService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.inventory.model.InventoryMovement;
import com.inventory.repository.InventoryMovementRepository;
import java.time.LocalDateTime;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockAlertService stockAlertService;
    private final InventoryMovementRepository inventoryMovementRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository, ProductRepository productRepository, WarehouseRepository warehouseRepository, StockAlertService stockAlertService, InventoryMovementRepository inventoryMovementRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
        this.warehouseRepository = warehouseRepository;
        this.stockAlertService = stockAlertService;
        this.inventoryMovementRepository = inventoryMovementRepository;
    }

    @Override
    public InventoryResponseDTO create(InventoryRequestDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Warehouse warehouse = warehouseRepository.findById(dto.getWarehouseId())
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
        if (inventoryRepository.findByProductAndWarehouse(product, warehouse).isPresent()) {
            throw new DataIntegrityViolationException("Inventory for this product and warehouse already exists");
        }
        Inventory inventory = InventoryMapper.toEntity(dto, product, warehouse);
        Inventory saved = inventoryRepository.save(inventory);
        stockAlertService.createAlertIfLowStock(saved);
        return InventoryMapper.toResponseDTO(saved);
    }

    @Override
    public List<InventoryResponseDTO> getAll() {
        return inventoryRepository.findAll().stream()
                .map(InventoryMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryResponseDTO getById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));
        return InventoryMapper.toResponseDTO(inventory);
    }

    @Override
    public InventoryResponseDTO update(Long id, InventoryRequestDTO dto) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found"));
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        Warehouse warehouse = warehouseRepository.findById(dto.getWarehouseId())
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
        // Check for duplicate (product, warehouse) except for this record
        inventoryRepository.findByProductAndWarehouse(product, warehouse)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new DataIntegrityViolationException("Inventory for this product and warehouse already exists");
                });
        int oldQuantity = inventory.getQuantity();
        inventory.setProduct(product);
        inventory.setWarehouse(warehouse);
        inventory.setQuantity(dto.getQuantity());
        if (dto.getReorderThreshold() != null) {
            inventory.setReorderThreshold(dto.getReorderThreshold());
        }
        Inventory updated = inventoryRepository.save(inventory);
        stockAlertService.createAlertIfLowStock(updated);
        // Log inventory movement (ADJUSTMENT)
        int diff = dto.getQuantity() - oldQuantity;
        if (diff != 0) {
            InventoryMovement movement = InventoryMovement.builder()
                .product(product)
                .warehouse(warehouse)
                .movementType(InventoryMovement.MovementType.ADJUSTMENT)
                .quantity(diff)
                .movementDate(LocalDateTime.now())
                .reference("Manual adjustment")
                .build();
            inventoryMovementRepository.save(movement);
        }
        return InventoryMapper.toResponseDTO(updated);
    }

    @Override
    public void delete(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Inventory not found");
        }
        inventoryRepository.deleteById(id);
    }
}