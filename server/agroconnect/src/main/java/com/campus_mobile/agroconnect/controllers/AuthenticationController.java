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


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
        UserDetails userDetails = authorizationService.loadUserByUsername(data.email());
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
