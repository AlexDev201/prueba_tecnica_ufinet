package com.example.technical_test.controller;

import com.example.technical_test.dto.LoginRequestDTO;
import com.example.technical_test.dto.LoginResponseDTO;
import com.example.technical_test.dto.UserRegisterRequestDTO;
import com.example.technical_test.dto.UserRegisterResponseDTO;
import com.example.technical_test.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController (AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponseDTO> register(@Valid @RequestBody UserRegisterRequestDTO userRegisterRequestDTO){
        return ResponseEntity.ok(authService.userRegister(userRegisterRequestDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO){
        return ResponseEntity.ok(authService.userLogin(loginRequestDTO));
    }
}
