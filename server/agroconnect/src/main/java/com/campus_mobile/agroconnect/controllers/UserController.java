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
        User user = userService.getUserById(id);
        Response<User> response = new Response<>("success", "User found", user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<Response<User>> getProfile(Authentication authentication) {
        Response<User> response = new Response<>();

        try {
            User user = userService.getUserFromAuthentication(authentication);

            response.setStatus("success");
            response.setMessage("User found");
            response.setData(user);

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            response.setStatus("error");
            response.setMessage("An unexpected error occurred");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Response<Optional<User>>> deleteUserById(@PathVariable UUID id) {
        Optional<User> user = userService.deleteUserById(id);

        Response<Optional<User>> response = new Response<>("Sucess", "Sucesso", user);

        return ResponseEntity.ok(response);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Response<User>> updateUser(@PathVariable UUID id, @RequestBody User user) {
//        try {
//            User updatedUser = userService.updateUser(id, user);
//            Response<User> response = new Response<>("success", "User updated successfully", updatedUser);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Response<User> response = new Response<>("error", "An error occurred while updating user", null);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
//
//    @PutMapping("/{id}/change-password")
//    public ResponseEntity<Response<String>> changePassword(@PathVariable UUID id, @RequestBody Map<String, String> passwords) {
//        String oldPassword = passwords.get("oldPassword");
//        String newPassword = passwords.get("newPassword");
//
//        try {
//            userService.changePassword(id, oldPassword, newPassword);
//            Response<String> response = new Response<>("success", "Password changed successfully", null);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            Response<String> response = new Response<>("error", "An error occurred while changing password", null);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
}