package com.campus_mobile.agroconnect.controllers;

import com.campus_mobile.agroconnect.dto.Authentication.AuthenticationDTO;
import com.campus_mobile.agroconnect.dto.Authentication.AuthenticationResponseDTO;
import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import com.campus_mobile.agroconnect.services.AuthService;
import com.campus_mobile.agroconnect.services.AuthorizationService;
import com.campus_mobile.agroconnect.services.FileStorageService;
import com.campus_mobile.agroconnect.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthService authService;
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private AuthorizationService authorizationService;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        System.out.println(data);
        System.out.println(data.email());
        System.out.println(data.password());
        UserDetails userDetails = authorizationService.loadUserByUsername(data.email());
        if (passwordEncoder.matches(data.password(), userDetails.getPassword())) {
            System.out.println("Password match successful!");
        } else {
            System.out.println(data.password());
            System.out.println(userDetails.getPassword());
            System.out.println("Password match failed!");
        }

        System.out.println(userDetails);
        String token = authService.login(data.email(), data.password());

        return ResponseEntity.ok(new AuthenticationResponseDTO(token));
    }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> register(
            @ModelAttribute @Valid RegisterDTO data) throws IOException {

        authService.register(data);
        return ResponseEntity.ok("User registered successfully");
    }
}
