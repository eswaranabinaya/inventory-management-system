package com.inventory.dto;

import lombok.*;

import javax.validation.constraints.*;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    @NotBlank
    @Size(max = 255)
    private String name;

    @NotBlank
    @Size(max = 255)
    private String sku;

    @Size(max = 255)
    private String category;

    @NotNull
    @PositiveOrZero
    private BigDecimal price;

    private String description;
}