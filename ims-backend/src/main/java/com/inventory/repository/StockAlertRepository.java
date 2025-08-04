package com.inventory.repository;

import com.inventory.model.StockAlert;
import com.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockAlertRepository extends JpaRepository<StockAlert, Long> {
    List<StockAlert> findByResolvedFalse();
    List<StockAlert> findByInventory(Inventory inventory);
}