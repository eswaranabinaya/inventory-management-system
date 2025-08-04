package com.inventory.controller;

import com.inventory.model.StockAlert;
import com.inventory.service.StockAlertService;
import com.inventory.dto.StockAlertResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stock-alerts")
@RequiredArgsConstructor
public class StockAlertController {
    private final StockAlertService stockAlertService;

    @GetMapping
    public ResponseEntity<List<StockAlertResponseDTO>> getActiveAlerts() {
        return ResponseEntity.ok(
            stockAlertService.getActiveAlerts().stream().map(alert -> {
                StockAlertResponseDTO dto = new StockAlertResponseDTO();
                dto.setId(alert.getId());
                dto.setProductName(alert.getInventory().getProduct().getName());
                dto.setWarehouseName(alert.getInventory().getWarehouse().getName());
                dto.setQuantity(alert.getQuantity());
                dto.setThreshold(alert.getThreshold());
                dto.setCreatedAt(alert.getCreatedAt().toString());
                dto.setResolved(alert.isResolved());
                return dto;
            }).collect(Collectors.toList())
        );
    }

    @PostMapping("/{id}/resolve")
    public ResponseEntity<Void> resolveAlert(@PathVariable Long id) {
        stockAlertService.resolveAlert(id);
        return ResponseEntity.ok().build();
    }
}