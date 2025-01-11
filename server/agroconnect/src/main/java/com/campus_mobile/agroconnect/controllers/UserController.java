package com.campus_mobile.agroconnect.controllers;

import com.campus_mobile.agroconnect.dto.User.UserResponseDTO;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.services.UserService;
import com.campus_mobile.agroconnect.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<User> getAllUsers() {
        try {
            return userService.getAllUsers();
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro inesperado", e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<User>> getUserById(@PathVariable UUID id) {
        System.out.println(id);
        User user = userService.getUserById(id);
        if (user != null) {
            Response<User> response = new Response<>("success", "User found", user);
            return ResponseEntity.ok(response);
        } else {
            Response<User> response = new Response<>("error", "User not found");
            return ResponseEntity.status(404).body(response);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Response<User>> getProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Response<User> response = new Response<>("error", "User not found");
        return ResponseEntity.ok(response);
    }
}