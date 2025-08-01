package com.inventory.controller;

import com.inventory.model.StockAlert;
import com.inventory.service.StockAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-alerts")
@RequiredArgsConstructor
public class StockAlertController {
    private final StockAlertService stockAlertService;

    @GetMapping
    public ResponseEntity<List<StockAlert>> getActiveAlerts() {
        return ResponseEntity.ok(stockAlertService.getActiveAlerts());
    }

    @PostMapping("/{id}/resolve")
    public ResponseEntity<Void> resolveAlert(@PathVariable Long id) {
        stockAlertService.resolveAlert(id);
        return ResponseEntity.ok().build();
    }
}