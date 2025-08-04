package com.inventory.repository;

import com.inventory.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, UUID> {
    // Custom queries if needed
}