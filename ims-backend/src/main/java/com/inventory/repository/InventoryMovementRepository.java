package com.inventory.repository;

import com.inventory.model.InventoryMovement;
import com.inventory.model.Product;
import com.inventory.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Repository
public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {
    @Query("SELECT COALESCE(SUM(im.unitCost * im.quantity), 0) FROM InventoryMovement im WHERE im.product = :product AND (:warehouse IS NULL OR im.warehouse = :warehouse) AND im.movementType = 'OUTBOUND' AND im.movementDate BETWEEN :start AND :end")
    BigDecimal sumCogsForProductAndWarehouse(@Param("product") Product product, @Param("warehouse") Warehouse warehouse, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COALESCE(SUM(im.quantity), 0) FROM InventoryMovement im WHERE im.product = :product AND (:warehouse IS NULL OR im.warehouse = :warehouse) AND im.movementDate <= :at")
    Integer getInventoryOnHandAt(@Param("product") Product product, @Param("warehouse") Warehouse warehouse, @Param("at") LocalDateTime at);
}