package com.inventory.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String token;
    private String username;
    private String role;
}