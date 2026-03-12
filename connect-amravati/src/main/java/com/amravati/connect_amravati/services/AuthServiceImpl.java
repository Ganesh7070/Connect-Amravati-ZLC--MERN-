//package com.amravati.connect_amravati.services;
//
//import com.amravati.connect_amravati.dto.LoginRequest;
//import com.amravati.connect_amravati.dto.LoginResponse;
//import com.amravati.connect_amravati.entity.User;
//import com.amravati.connect_amravati.repository.UserRepository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class AuthServiceImpl implements AuthService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    @Override
//    public LoginResponse login(LoginRequest request) {
//
//        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
//
//        if (userOptional.isEmpty()) {
//            return new LoginResponse("User not found", null);
//        }
//
//        User user = userOptional.get();
//
//        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//            return new LoginResponse("Invalid password", null);
//        }
//
//        return new LoginResponse("Login Successful", user.getRole().name());
//    }
//}
//
//
//package com.amravati.connect_amravati.services;
//
//import com.amravati.connect_amravati.dto.LoginRequest;
//import com.amravati.connect_amravati.dto.LoginResponse;
//import com.amravati.connect_amravati.entity.User;
//import com.amravati.connect_amravati.repository.UserRepository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class AuthServiceImpl implements AuthService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;
//
//    @Override
//    public LoginResponse login(LoginRequest request) {
//
//        // DEBUG LOG
//        System.out.println("Username received from API: " + request.getUsername());
//
//        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
//
//        // DEBUG LOG
//        System.out.println("User present in DB: " + userOptional.isPresent());
//
//        if (userOptional.isEmpty()) {
//            return new LoginResponse("User not found", null);
//        }
//
//        User user = userOptional.get();
//
//        // DEBUG LOG
//        System.out.println("Stored password: " + user.getPassword());
//
//        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//
//            System.out.println("Password mismatch!");
//
//            return new LoginResponse("Invalid password", null);
//        }
//       
//        System.out.println("Login successful for user: " + user.getUsername());
//
//        return new LoginResponse("Login Successful", user.getRole().name());
//    }
//}
//
//
package com.amravati.connect_amravati.services;

import com.amravati.connect_amravati.dto.LoginRequest;
import com.amravati.connect_amravati.dto.LoginResponse;
import com.amravati.connect_amravati.entity.User;
import com.amravati.connect_amravati.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public LoginResponse login(LoginRequest request) {

        System.out.println("Username received from API: " + request.getUsername());

        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());

        System.out.println("User present in DB: " + userOptional.isPresent());

        if (userOptional.isEmpty()) {
            return new LoginResponse("User not found", null);
        }

        User user = userOptional.get();

        System.out.println("Stored password: " + user.getPassword());

        if (!request.getPassword().equals(user.getPassword())) {

            System.out.println("Password mismatch!");

            return new LoginResponse("Invalid password", null);
        }

        System.out.println("Login successful for user: " + user.getUsername());

        return new LoginResponse("Login Successful", user.getRole().name());
    }
}
