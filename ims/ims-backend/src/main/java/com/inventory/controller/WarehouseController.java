package com.inventory.controller;

import com.inventory.dto.WarehouseRequestDTO;
import com.inventory.dto.WarehouseResponseDTO;
import com.inventory.service.WarehouseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {
    private final WarehouseService warehouseService;

    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }

    @PostMapping
    public WarehouseResponseDTO create(@Valid @RequestBody WarehouseRequestDTO dto) {
        return warehouseService.create(dto);
    }

    @GetMapping
    public List<WarehouseResponseDTO> getAll() {
        return warehouseService.getAll();
    }

    @GetMapping("/{id}")
    public WarehouseResponseDTO getById(@PathVariable UUID id) {
        return warehouseService.getById(id);
    }

    @PutMapping("/{id}")
    public WarehouseResponseDTO update(@PathVariable UUID id, @Valid @RequestBody WarehouseRequestDTO dto) {
        return warehouseService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        warehouseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}