package com.inventory.dto;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseResponseDTO {
    private UUID id;
    private String name;
    private String location;
}