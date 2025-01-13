package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import com.campus_mobile.agroconnect.dto.User.UserResponseDTO;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.model.UserRole;
import com.campus_mobile.agroconnect.repository.UserRepository;
import exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public List<User> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();

            if (users.isEmpty()) {
                throw new UserNotFoundException("Nenhum usuário encontrado!");
            }

            return users;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao recuperar usuários", e);
        }
    }

    public User getUserById(UUID id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado com id: " + id));
    }

    public User getUserFromAuthentication(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UserNotFoundException();
        }

        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        return user;
    }

    public Optional<User> deleteUserByEmail(String email){
        Optional<User> userExist = userRepository.findByEmail(email);

        if(userExist.isEmpty()){
            throw new UserNotFoundException();
        }

        userRepository.deleteByEmail(email);

        return userExist;
    }

    public Optional<User> deleteUserById(UUID id) {
        Optional<User> userExist = userRepository.findById(id);

        if(userExist.isEmpty()){
            throw new UserNotFoundException("Usuário não encontrado com id: " + id);
        }

        userRepository.deleteById(id);

        return userExist;
    }
}
