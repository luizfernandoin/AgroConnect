package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Authentication.RegisterDTO;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.repository.ProducerRepository;
import com.campus_mobile.agroconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProducerRepository producerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private FileStorageService fileStorageService;

    private void buildCommonUserAttributes(RegisterDTO data, String encryptedPassword, String filename, User user) {
        user.setName(data.name());
        user.setEmail(data.email());
        user.setPassword(encryptedPassword);
        user.setImage(filename);
        user.setPhone(data.phone());
        user.setCpf(data.cpf());
        user.setCnpj(data.cnpj());
        user.setRole(UserRole.valueOf(data.role()));
    }

    private void createProducer(RegisterDTO data, String encryptedPassword, String filename) {
        Producer newProducer = new Producer();
        buildCommonUserAttributes(data, encryptedPassword, filename, newProducer);

        newProducer.setProductionType(ProductionType.valueOf(data.productionType()));
        newProducer.setDescription(data.description());

        producerRepository.save(newProducer);
    }

    private void createCustomer(RegisterDTO data, String encryptedPassword, String filename) {
        User newUser = new User();
        buildCommonUserAttributes(data, encryptedPassword, filename, newUser);

        userRepository.save(newUser);
    }

    public void register(RegisterDTO data) {
        Optional<User> existingUser = userRepository.findByEmail(data.email());

        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("E-mail already registered");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        String filename = data.image() == null
                ? fileStorageService.getDefaultFileUri(EntityType.USER)
                : fileStorageService.storeFile(data.image(), EntityType.USER);

        if (UserRole.valueOf(data.role()) == UserRole.PRODUCER) {
            createProducer(data, encryptedPassword, filename);
        } else {
            createCustomer(data, encryptedPassword, filename);
        }
    }

    public String login(String email, String password) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(email, password);
        var auth = authenticationManager.authenticate(usernamePassword);

        var user = (User) auth.getPrincipal();
        return tokenService.generateToken(user);
    }
}
