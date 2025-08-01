package com.inventory.service;

import com.inventory.dto.WarehouseRequestDTO;
import com.inventory.dto.WarehouseResponseDTO;

import java.util.List;
import java.util.UUID;

public interface WarehouseService {
    WarehouseResponseDTO create(WarehouseRequestDTO dto);
    List<WarehouseResponseDTO> getAll();
    WarehouseResponseDTO getById(UUID id);
    WarehouseResponseDTO update(UUID id, WarehouseRequestDTO dto);
    void delete(UUID id);
}