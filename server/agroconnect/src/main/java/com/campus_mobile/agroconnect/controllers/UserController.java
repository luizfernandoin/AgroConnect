package com.campus_mobile.agroconnect.controllers;

import com.campus_mobile.agroconnect.dto.User.UserResponseDTO;
import com.campus_mobile.agroconnect.dto.User.UserUploadDTO;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.services.UserService;
import com.campus_mobile.agroconnect.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response<User>> getUserById(@PathVariable UUID id) {
        User user = userService.getUserById(id);
        Response<User> response = new Response<>("success", "User found", user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<Response<User>> getProfile(Authentication authentication) {
        Response<User> response = new Response<>();

        User user = userService.getUserFromAuthentication(authentication);

        response.setStatus("success");
        response.setMessage("User found");
        response.setData(user);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response<Optional<User>>> deleteUserById(@PathVariable UUID id) {
        Optional<User> user = userService.deleteUserById(id);

        Response<Optional<User>> response = new Response<>("Sucess", "Sucesso", user);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/")
    public ResponseEntity<Response<Optional<User>>> deleteUserById(Authentication authentication) {
        User user = userService.getUserFromAuthentication(authentication);

        Optional<User> userDeleted = userService.deleteUserById(user.getId());

        Response<Optional<User>> response = new Response<>("Sucess", "Sucesso", userDeleted);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable UUID id, @RequestBody UserUploadDTO userUpdateDTO) {
        UserResponseDTO updatedUser = userService.updateUser(id, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/")
    public ResponseEntity<UserResponseDTO> updateUser(Authentication authentication, @RequestBody UserUploadDTO userUpdateDTO) {
        User user = userService.getUserFromAuthentication(authentication);

        UserResponseDTO updatedUser = userService.updateUser(user.getId(), userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> patchUser(@PathVariable UUID id, @RequestBody UserUploadDTO userUpdateDTO) {
        UserResponseDTO updatedUser = userService.updateUser(id, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/")
    public ResponseEntity<UserResponseDTO> patchUser(Authentication authentication, @RequestBody UserUploadDTO userUpdateDTO) {
        User user = userService.getUserFromAuthentication(authentication);

        UserResponseDTO updatedUser = userService.updateUser(user.getId(), userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }
}