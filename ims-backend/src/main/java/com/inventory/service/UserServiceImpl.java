package com.inventory.service;

import com.inventory.dto.AuthRequestDTO;
import com.inventory.dto.AuthResponseDTO;
import com.inventory.model.User;
import com.inventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponseDTO register(AuthRequestDTO request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER")
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        return response;
    }

    @Override
    public AuthResponseDTO login(AuthRequestDTO request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        String token = jwtService.generateToken(user);
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setRole(user.getRole());
        return response;
    }
}