package com.inventory.repository;

import com.inventory.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

public interface WarehouseRepository extends JpaRepository<Warehouse, UUID> {
    Optional<Warehouse> findByName(String name);
}