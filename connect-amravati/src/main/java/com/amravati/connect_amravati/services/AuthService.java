package com.amravati.connect_amravati.services;

import com.amravati.connect_amravati.dto.LoginRequest;
import com.amravati.connect_amravati.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}