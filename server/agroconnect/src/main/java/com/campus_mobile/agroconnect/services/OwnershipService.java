package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.model.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class OwnershipService {
    @Autowired
    private UserService userService;

    @Transactional
    public void verifyOwnership(UUID resourceOwnerId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated.");
        }

        System.out.println(authentication);

        User user = userService.getUserFromAuthentication(authentication);

        if (!resourceOwnerId.equals(user.getId())) {
            throw new RuntimeException("Access denied: You do not own this resource.");
        }
    }

}
