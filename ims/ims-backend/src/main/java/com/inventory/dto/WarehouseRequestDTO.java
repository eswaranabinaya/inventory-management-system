package com.inventory.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseRequestDTO {
    @NotBlank
    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String location;
}