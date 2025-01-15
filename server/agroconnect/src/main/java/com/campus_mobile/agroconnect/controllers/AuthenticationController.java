package com.campus_mobile.agroconnect.controllers;

import com.campus_mobile.agroconnect.dto.Authentication.AuthenticationDTO;
import com.campus_mobile.agroconnect.dto.Authentication.AuthenticationResponseDTO;
import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import com.campus_mobile.agroconnect.services.AuthorizationService;
import com.campus_mobile.agroconnect.services.FileStorageService;
import com.campus_mobile.agroconnect.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private AuthorizationService authorizationService;


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody AuthenticationDTO data) {
        UserDetails userDetails = authorizationService.loadUserByUsername(data.email());
        try {
            String token = userService.login(data.email(), data.password());
            return ResponseEntity.ok(new AuthenticationResponseDTO(token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthenticationResponseDTO("Invalid credentials"));
        }
    }

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> register(
            @ModelAttribute @Valid RegisterDTO data) throws IOException {
        try {
            userService.register(data);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
