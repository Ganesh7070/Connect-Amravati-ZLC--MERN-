package com.amravati.connect_amravati.controller;

import com.amravati.connect_amravati.dto.LoginRequest;
import com.amravati.connect_amravati.dto.LoginResponse;
import com.amravati.connect_amravati.services.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return authService.login(request);

    }
}