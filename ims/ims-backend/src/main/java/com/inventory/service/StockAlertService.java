package com.inventory.service;

import com.inventory.model.Inventory;
import com.inventory.model.StockAlert;
import java.util.List;

public interface StockAlertService {
    void createAlertIfLowStock(Inventory inventory);
    List<StockAlert> getActiveAlerts();
    void resolveAlert(Long alertId);
}