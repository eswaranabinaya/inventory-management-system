package com.inventory.service;

import com.inventory.dto.WarehouseRequestDTO;
import com.inventory.dto.WarehouseResponseDTO;
import com.inventory.model.Warehouse;
import com.inventory.repository.WarehouseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.EntityNotFoundException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WarehouseServiceImplTest {
    @Mock WarehouseRepository warehouseRepository;
    @InjectMocks WarehouseServiceImpl warehouseService;

    private WarehouseRequestDTO requestDTO;
    private Warehouse warehouse;

    @BeforeEach
    void setUp() {
        UUID id = UUID.randomUUID();
        warehouse = Warehouse.builder().id(id).name("Main WH").location("Loc1").build();
        requestDTO = WarehouseRequestDTO.builder().name("Main WH").location("Loc1").build();
    }

    @Test
    @DisplayName("Should create warehouse when name is unique")
    void createWarehouse_Success() {
        when(warehouseRepository.findAll()).thenReturn(Collections.emptyList());
        when(warehouseRepository.save(any(Warehouse.class))).thenReturn(warehouse);
        WarehouseResponseDTO response = warehouseService.create(requestDTO);
        assertNotNull(response);
        assertEquals(warehouse.getName(), response.getName());
    }

    @Test
    @DisplayName("Should throw exception when warehouse name is duplicate")
    void createWarehouse_DuplicateName() {
        when(warehouseRepository.findAll()).thenReturn(List.of(warehouse));
        assertThrows(DataIntegrityViolationException.class, () -> warehouseService.create(requestDTO));
    }

    @Test
    @DisplayName("Should get warehouse by ID")
    void getById_Success() {
        when(warehouseRepository.findById(warehouse.getId())).thenReturn(Optional.of(warehouse));
        WarehouseResponseDTO response = warehouseService.getById(warehouse.getId());
        assertNotNull(response);
        assertEquals(warehouse.getId(), response.getId());
    }

    @Test
    @DisplayName("Should throw exception if warehouse not found by ID")
    void getById_NotFound() {
        UUID id = UUID.randomUUID();
        when(warehouseRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> warehouseService.getById(id));
    }

    @Test
    @DisplayName("Should update warehouse when name is unique")
    void updateWarehouse_Success() {
        UUID id = warehouse.getId();
        WarehouseRequestDTO updateDTO = WarehouseRequestDTO.builder().name("Updated WH").location("Loc2").build();
        when(warehouseRepository.findById(id)).thenReturn(Optional.of(warehouse));
        when(warehouseRepository.findAll()).thenReturn(List.of(warehouse));
        when(warehouseRepository.save(any(Warehouse.class))).thenReturn(warehouse);
        WarehouseResponseDTO response = warehouseService.update(id, updateDTO);
        assertNotNull(response);
        assertEquals(updateDTO.getName(), response.getName());
    }

    @Test
    @DisplayName("Should throw exception when updating with duplicate name")
    void updateWarehouse_DuplicateName() {
        UUID id = warehouse.getId();
        Warehouse other = Warehouse.builder().id(UUID.randomUUID()).name("Updated WH").location("Loc2").build();
        WarehouseRequestDTO updateDTO = WarehouseRequestDTO.builder().name("Updated WH").location("Loc2").build();
        when(warehouseRepository.findById(id)).thenReturn(Optional.of(warehouse));
        when(warehouseRepository.findAll()).thenReturn(List.of(warehouse, other));
        assertThrows(DataIntegrityViolationException.class, () -> warehouseService.update(id, updateDTO));
    }

    @Test
    @DisplayName("Should throw exception if warehouse not found on update")
    void updateWarehouse_NotFound() {
        UUID id = UUID.randomUUID();
        WarehouseRequestDTO updateDTO = WarehouseRequestDTO.builder().name("Updated WH").location("Loc2").build();
        when(warehouseRepository.findById(id)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> warehouseService.update(id, updateDTO));
    }

    @Test
    @DisplayName("Should delete warehouse when exists")
    void deleteWarehouse_Success() {
        UUID id = warehouse.getId();
        when(warehouseRepository.existsById(id)).thenReturn(true);
        doNothing().when(warehouseRepository).deleteById(id);
        assertDoesNotThrow(() -> warehouseService.delete(id));
        verify(warehouseRepository).deleteById(id);
    }

    @Test
    @DisplayName("Should throw exception when deleting non-existent warehouse")
    void deleteWarehouse_NotFound() {
        UUID id = UUID.randomUUID();
        when(warehouseRepository.existsById(id)).thenReturn(false);
        assertThrows(EntityNotFoundException.class, () -> warehouseService.delete(id));
        verify(warehouseRepository, never()).deleteById(id);
    }
}