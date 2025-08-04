package com.inventory.service;

import com.inventory.dto.WarehouseRequestDTO;
import com.inventory.dto.WarehouseResponseDTO;
import com.inventory.model.Warehouse;
import com.inventory.repository.WarehouseRepository;
import com.inventory.util.WarehouseMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {
    private final WarehouseRepository warehouseRepository;

    public WarehouseServiceImpl(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    @Override
    public WarehouseResponseDTO create(WarehouseRequestDTO dto) {
        if (warehouseRepository.findAll().stream().anyMatch(w -> w.getName().equalsIgnoreCase(dto.getName()))) {
            throw new DataIntegrityViolationException("Warehouse with this name already exists");
        }
        Warehouse warehouse = Warehouse.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .build();
        Warehouse saved = warehouseRepository.save(warehouse);
        return WarehouseResponseDTO.builder()
                .id(saved.getId())
                .name(saved.getName())
                .location(saved.getLocation())
                .build();
    }

    @Override
    public List<WarehouseResponseDTO> getAll() {
        return warehouseRepository.findAll().stream()
                .map(w -> WarehouseResponseDTO.builder()
                        .id(w.getId())
                        .name(w.getName())
                        .location(w.getLocation())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public WarehouseResponseDTO getById(UUID id) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
        return WarehouseResponseDTO.builder()
                .id(warehouse.getId())
                .name(warehouse.getName())
                .location(warehouse.getLocation())
                .build();
    }

    @Override
    public WarehouseResponseDTO update(UUID id, WarehouseRequestDTO dto) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
        if (warehouseRepository.findAll().stream().anyMatch(w -> !w.getId().equals(id) && w.getName().equalsIgnoreCase(dto.getName()))) {
            throw new DataIntegrityViolationException("Warehouse with this name already exists");
        }
        warehouse.setName(dto.getName());
        warehouse.setLocation(dto.getLocation());
        Warehouse updated = warehouseRepository.save(warehouse);
        return WarehouseResponseDTO.builder()
                .id(updated.getId())
                .name(updated.getName())
                .location(updated.getLocation())
                .build();
    }

    @Override
    public void delete(UUID id) {
        if (!warehouseRepository.existsById(id)) {
            throw new EntityNotFoundException("Warehouse not found");
        }
        warehouseRepository.deleteById(id);
    }
}