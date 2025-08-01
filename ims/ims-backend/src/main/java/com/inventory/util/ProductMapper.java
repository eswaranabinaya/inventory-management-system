package com.inventory.util;

import com.inventory.dto.ProductRequestDTO;
import com.inventory.dto.ProductResponseDTO;
import com.inventory.model.Product;

public class ProductMapper {
    public static Product toEntity(ProductRequestDTO dto) {
        if (dto == null) return null;
        return Product.builder()
                .name(dto.getName())
                .sku(dto.getSku())
                .category(dto.getCategory())
                .price(dto.getPrice())
                .description(dto.getDescription())
                .build();
    }

    public static ProductResponseDTO toResponseDTO(Product product) {
        if (product == null) return null;
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .category(product.getCategory())
                .price(product.getPrice())
                .description(product.getDescription())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public static void updateEntity(Product product, ProductRequestDTO dto) {
        if (dto == null || product == null) return;
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
    }
}