package com.inventory.service;

import com.inventory.dto.ProductRequestDTO;
import com.inventory.dto.ProductResponseDTO;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    ProductResponseDTO create(ProductRequestDTO dto);
    List<ProductResponseDTO> getAll();
    ProductResponseDTO getById(UUID id);
    ProductResponseDTO update(UUID id, ProductRequestDTO dto);
    void delete(UUID id);
}