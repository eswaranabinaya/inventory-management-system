package com.inventory.service;

import com.inventory.dto.ProductRequestDTO;
import com.inventory.dto.ProductResponseDTO;
import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import com.inventory.util.ProductMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponseDTO create(ProductRequestDTO dto) {
        if (productRepository.existsByName(dto.getName())) {
            throw new DataIntegrityViolationException("Product name must be unique");
        }
        if (productRepository.existsBySku(dto.getSku())) {
            throw new DataIntegrityViolationException("Product SKU must be unique");
        }
        Product product = ProductMapper.toEntity(dto);
        Product saved = productRepository.save(product);
        return ProductMapper.toResponseDTO(saved);
    }

    @Override
    public List<ProductResponseDTO> getAll() {
        return productRepository.findAll().stream()
                .map(ProductMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO getById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        return ProductMapper.toResponseDTO(product);
    }

    @Override
    public ProductResponseDTO update(UUID id, ProductRequestDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + id));
        // Check for unique name/sku if changed
        if (!product.getName().equals(dto.getName()) && productRepository.existsByName(dto.getName())) {
            throw new DataIntegrityViolationException("Product name must be unique");
        }
        if (!product.getSku().equals(dto.getSku()) && productRepository.existsBySku(dto.getSku())) {
            throw new DataIntegrityViolationException("Product SKU must be unique");
        }
        ProductMapper.updateEntity(product, dto);
        Product updated = productRepository.save(product);
        return ProductMapper.toResponseDTO(updated);
    }

    @Override
    public void delete(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product not found: " + id);
        }
        productRepository.deleteById(id);
    }
}