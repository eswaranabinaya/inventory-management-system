package com.inventory.service;

import com.inventory.dto.InventoryTurnoverReportDTO;
import com.inventory.dto.StockValuationReportDTO;
import com.inventory.dto.InventoryTrendReportDTO;
import com.inventory.repository.InventoryRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.PurchaseOrderRepository;
import com.inventory.repository.WarehouseRepository;
import com.inventory.repository.InventoryMovementRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import java.math.BigDecimal;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import java.util.UUID;
import java.util.stream.Collectors;
import com.inventory.model.InventoryMovement;

@Service
public class ReportingServiceImpl implements ReportingService {
    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final WarehouseRepository warehouseRepository;
    private final InventoryMovementRepository inventoryMovementRepository;

    public ReportingServiceImpl(InventoryRepository inventoryRepository,
                                ProductRepository productRepository,
                                PurchaseOrderRepository purchaseOrderRepository,
                                WarehouseRepository warehouseRepository,
                                InventoryMovementRepository inventoryMovementRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.warehouseRepository = warehouseRepository;
        this.inventoryMovementRepository = inventoryMovementRepository;
    }

    @Override
    public List<InventoryTurnoverReportDTO> getInventoryTurnover(UUID productId, UUID warehouseId, LocalDate startDate, LocalDate endDate) {
        List<Product> products = (productId != null)
            ? productRepository.findAll().stream().filter(p -> p.getId().equals(productId)).collect(Collectors.toList())
            : productRepository.findAll();
        List<Warehouse> warehouses = (warehouseId != null)
            ? warehouseRepository.findAll().stream().filter(w -> w.getId().equals(warehouseId)).collect(Collectors.toList())
            : warehouseRepository.findAll();
        List<InventoryTurnoverReportDTO> result = new ArrayList<>();
        for (Product product : products) {
            for (Warehouse warehouse : warehouses) {
                // Find unit cost for COGS calculation
                BigDecimal unitCost = BigDecimal.ZERO;
                List<InventoryMovement> movements = inventoryMovementRepository.findAll();
                for (InventoryMovement im : movements) {
                    if (im.getProduct().equals(product) && im.getWarehouse().equals(warehouse)
                        && im.getMovementType() == InventoryMovement.MovementType.OUTBOUND
                        && !im.getMovementDate().isBefore(startDate.atStartOfDay())
                        && !im.getMovementDate().isAfter(endDate.plusDays(1).atStartOfDay().minusSeconds(1))) {
                        unitCost = im.getUnitCost() != null ? im.getUnitCost() : BigDecimal.ZERO;
                        break;
                    }
                }
                if (unitCost.equals(BigDecimal.ZERO) && product.getPrice() != null) {
                    unitCost = product.getPrice();
                }
                // Defensive: default to zero if null
                BigDecimal cogs = inventoryMovementRepository.sumCogsForProductAndWarehouse(
                    product, warehouse, startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay().minusSeconds(1));
                if (cogs == null) cogs = BigDecimal.ZERO;
                Integer startQty = inventoryMovementRepository.getInventoryOnHandAt(product, warehouse, startDate.atStartOfDay());
                Integer endQty = inventoryMovementRepository.getInventoryOnHandAt(product, warehouse, endDate.plusDays(1).atStartOfDay().minusSeconds(1));
                if (startQty == null) startQty = 0;
                if (endQty == null) endQty = 0;
                BigDecimal avgInventory = (BigDecimal.valueOf(startQty).add(BigDecimal.valueOf(endQty))).divide(BigDecimal.valueOf(2), 2, BigDecimal.ROUND_HALF_UP);
                BigDecimal turnoverRatio = BigDecimal.ZERO;
                if (avgInventory.compareTo(BigDecimal.ZERO) > 0) {
                    turnoverRatio = cogs.divide(avgInventory, 2, BigDecimal.ROUND_HALF_UP);
                }
                result.add(InventoryTurnoverReportDTO.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .warehouseId(warehouse.getId())
                    .warehouseName(warehouse.getName())
                    .periodStart(startDate.toString())
                    .periodEnd(endDate.toString())
                    .turnoverRatio(turnoverRatio)
                    .costOfGoodsSold(cogs)
                    .averageInventory(avgInventory)
                    .unitCost(unitCost)
                    .build());
            }
        }
        return result;
    }

    @Override
    public List<StockValuationReportDTO> getStockValuation(UUID productId, UUID warehouseId) {
        List<Product> products = (productId != null)
            ? productRepository.findAll().stream().filter(p -> p.getId().equals(productId)).collect(Collectors.toList())
            : productRepository.findAll();
        List<Warehouse> warehouses = (warehouseId != null)
            ? warehouseRepository.findAll().stream().filter(w -> w.getId().equals(warehouseId)).collect(Collectors.toList())
            : warehouseRepository.findAll();
        List<StockValuationReportDTO> result = new ArrayList<>();
        for (Product product : products) {
            for (Warehouse warehouse : warehouses) {
                inventoryRepository.findByProductAndWarehouse(product, warehouse).ifPresent(inventory -> {
                    BigDecimal quantityOnHand = inventory.getQuantity() != null ? new BigDecimal(inventory.getQuantity()) : BigDecimal.ZERO;
                    BigDecimal unitCost = product.getPrice() != null ? product.getPrice() : BigDecimal.ZERO;
                    BigDecimal totalValue = quantityOnHand.multiply(unitCost);
                    result.add(StockValuationReportDTO.builder()
                        .productId(product.getId() != null ? product.getId().getMostSignificantBits() : null)
                        .productName(product.getName())
                        .warehouseId(warehouse.getId() != null ? warehouse.getId().getMostSignificantBits() : null)
                        .warehouseName(warehouse.getName())
                        .quantityOnHand(quantityOnHand)
                        .unitCost(unitCost)
                        .totalValue(totalValue)
                        .build());
                });
            }
        }
        return result;
    }

    @Override
    public List<InventoryTrendReportDTO> getInventoryTrends(UUID productId, UUID warehouseId, LocalDate startDate, LocalDate endDate) {
        List<Product> products = (productId != null)
            ? productRepository.findAll().stream().filter(p -> p.getId().equals(productId)).collect(Collectors.toList())
            : productRepository.findAll();
        List<Warehouse> warehouses = (warehouseId != null)
            ? warehouseRepository.findAll().stream().filter(w -> w.getId().equals(warehouseId)).collect(Collectors.toList())
            : warehouseRepository.findAll();
        List<InventoryTrendReportDTO> result = new ArrayList<>();
        for (Product product : products) {
            for (Warehouse warehouse : warehouses) {
                // Get initial quantity from Inventory table
                Integer initialQty = inventoryRepository.findByProductAndWarehouse(product, warehouse)
                    .map(inv -> inv.getQuantity())
                    .orElse(0);
                LocalDate date = startDate;
                while (!date.isAfter(endDate)) {
                    // Use movements up to this date
                    Integer qty = inventoryMovementRepository.getInventoryOnHandAt(product, warehouse, date.atStartOfDay());
                    // If there are no movements, use the Inventory quantity
                    BigDecimal quantityOnHand = (qty != null && qty != 0) ? new BigDecimal(qty) : new BigDecimal(initialQty);
                    result.add(InventoryTrendReportDTO.builder()
                        .productId(product.getId() != null ? product.getId().getMostSignificantBits() : null)
                        .productName(product.getName())
                        .warehouseId(warehouse.getId() != null ? warehouse.getId().getMostSignificantBits() : null)
                        .warehouseName(warehouse.getName())
                        .date(date.toString())
                        .quantityOnHand(quantityOnHand)
                        .build());
                    date = date.plusDays(1);
                }
            }
        }
        return result;
    }
}