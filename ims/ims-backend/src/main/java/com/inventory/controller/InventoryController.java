package com.inventory.controller;

import com.inventory.dto.InventoryRequestDTO;
import com.inventory.dto.InventoryResponseDTO;
import com.inventory.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@Validated
public class InventoryController {
    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @PostMapping
    public ResponseEntity<InventoryResponseDTO> create(@Valid @RequestBody InventoryRequestDTO dto) {
        InventoryResponseDTO created = inventoryService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<InventoryResponseDTO> getAll() {
        return inventoryService.getAll();
    }

    @GetMapping("/{id}")
    public InventoryResponseDTO getById(@PathVariable Long id) {
        return inventoryService.getById(id);
    }

    @PutMapping("/{id}")
    public InventoryResponseDTO update(@PathVariable Long id, @Valid @RequestBody InventoryRequestDTO dto) {
        return inventoryService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        inventoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}