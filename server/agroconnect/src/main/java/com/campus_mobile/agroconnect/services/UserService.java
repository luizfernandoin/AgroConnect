package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.model.UserRole;
import com.campus_mobile.agroconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private FileStorageService fileStorageService;


    public void register(RegisterDTO data) {
        if (userRepository.findByEmail(data.email()) != null) {
            throw new IllegalArgumentException("E-mail already registered");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        String fileName = fileStorageService.storeFile(data.image());

        User newUser = new User(
                data.name(),
                data.email(),
                encryptedPassword,
                fileName,
                data.phone(),
                data.cpf(),
                data.cnpj(),
                UserRole.valueOf(data.role())
        );

        userRepository.save(newUser);
    }

    public String login(String email, String password) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(email, password);
        var auth = authenticationManager.authenticate(usernamePassword);

        var user = (User) auth.getPrincipal();
        return tokenService.generateToken(user);
    }
}
