package com.inventory.service;

import com.inventory.dto.AuthRequestDTO;
import com.inventory.dto.AuthResponseDTO;

public interface UserService {
    AuthResponseDTO register(AuthRequestDTO request);
    AuthResponseDTO login(AuthRequestDTO request);
}