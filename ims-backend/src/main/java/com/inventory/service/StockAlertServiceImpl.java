package com.inventory.service;

import com.inventory.model.Inventory;
import com.inventory.model.StockAlert;
import com.inventory.repository.StockAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockAlertServiceImpl implements StockAlertService {
    private final StockAlertRepository stockAlertRepository;

    @Override
    @Transactional
    public void createAlertIfLowStock(Inventory inventory) {
        if (inventory.getQuantity() < inventory.getReorderThreshold()) {
            // Only create a new alert if one doesn't already exist and is unresolved
            boolean exists = stockAlertRepository.findByInventory(inventory).stream()
                .anyMatch(alert -> !alert.isResolved());
            if (!exists) {
                StockAlert alert = StockAlert.builder()
                        .inventory(inventory)
                        .quantity(inventory.getQuantity())
                        .threshold(inventory.getReorderThreshold())
                        .createdAt(LocalDateTime.now())
                        .resolved(false)
                        .build();
                stockAlertRepository.save(alert);
            }
        }
    }

    @Override
    public List<StockAlert> getActiveAlerts() {
        return stockAlertRepository.findByResolvedFalse();
    }

    @Override
    @Transactional
    public void resolveAlert(Long alertId) {
        StockAlert alert = stockAlertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Stock alert not found"));
        alert.setResolved(true);
        alert.setResolvedAt(LocalDateTime.now());
        stockAlertRepository.save(alert);
    }
}