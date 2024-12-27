package com.campus_mobile.agroconnect.controllers;

import com.campus_mobile.agroconnect.models.User;
import com.campus_mobile.agroconnect.models.UserRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/all")
    public String getAllUsers() {
        return "All users";
    }
}