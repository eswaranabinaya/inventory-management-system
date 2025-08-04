package com.inventory.service;

import com.inventory.dto.InventoryRequestDTO;
import com.inventory.dto.InventoryResponseDTO;

import java.util.List;

public interface InventoryService {
    InventoryResponseDTO create(InventoryRequestDTO dto);
    List<InventoryResponseDTO> getAll();
    InventoryResponseDTO getById(Long id);
    InventoryResponseDTO update(Long id, InventoryRequestDTO dto);
    void delete(Long id);
}