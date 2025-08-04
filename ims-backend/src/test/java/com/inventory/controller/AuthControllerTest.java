package com.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inventory.dto.AuthRequestDTO;
import com.inventory.dto.AuthResponseDTO;
import com.inventory.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(AuthController.class)
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private UserService userService;
    @MockBean
    private JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("POST /api/auth/register - success")
    void register_Success() throws Exception {
        AuthRequestDTO request = new AuthRequestDTO();
        request.setUsername("user");
        request.setPassword("pass");
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken("token");
        Mockito.when(userService.register(any(AuthRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token"));
    }

    @Test
    @DisplayName("POST /api/auth/login - success")
    void login_Success() throws Exception {
        AuthRequestDTO request = new AuthRequestDTO();
        request.setUsername("user");
        request.setPassword("pass");
        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken("token");
        Mockito.when(userService.login(any(AuthRequestDTO.class))).thenReturn(response);
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token"));
    }
}