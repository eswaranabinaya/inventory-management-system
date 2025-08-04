package com.inventory.controller;

import com.inventory.dto.AuthRequestDTO;
import com.inventory.dto.AuthResponseDTO;
import com.inventory.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(userService.login(request));
    }
}