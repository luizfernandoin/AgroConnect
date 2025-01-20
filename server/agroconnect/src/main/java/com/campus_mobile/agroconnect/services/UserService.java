package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.User.UserResponseDTO;
import com.campus_mobile.agroconnect.dto.User.UserUploadDTO;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.repository.UserRepository;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FileStorageService fileStorageService;


    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            throw new ResourceNotFoundException("Nenhum usuário encontrado!");
        }

        return users;
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com id: " + id));
    }

    public User getUserFromAuthentication(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResourceNotFoundException();
        }

        User user = (User) authentication.getPrincipal();

        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        return user;
    }

    public Optional<User> deleteUserByEmail(String email){
        Optional<User> userExist = userRepository.findByEmail(email);

        if(userExist.isEmpty()){
            throw new ResourceNotFoundException();
        }

        userRepository.deleteByEmail(email);

        return userExist;
    }

    public Optional<User> deleteUserById(UUID id) {
        Optional<User> userExist = userRepository.findById(id);

        if(userExist.isEmpty()){
            throw new ResourceNotFoundException("Usuário não encontrado com id: " + id);
        }

        userRepository.deleteById(id);

        return userExist;
    }

    public UserResponseDTO updateUser(UUID id, UserUploadDTO userUpdateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        String filename;
        if (userUpdateDTO.image() == null) {
            filename = fileStorageService.getDefaultFileUri(EntityType.USER);
        } else {
            filename = fileStorageService.storeFile(userUpdateDTO.image(), EntityType.USER);
        }

        if (userUpdateDTO.name() != null) {
            user.setName(userUpdateDTO.name());
        }
        if (userUpdateDTO.email() != null) {
            user.setEmail(userUpdateDTO.email());
        }
        if (userUpdateDTO.password() != null) {
            user.setPassword(userUpdateDTO.password());
        }
        if (userUpdateDTO.image() != null) {
            user.setImage(filename);
        }
        if (userUpdateDTO.phone() != null) {
            user.setPhone(userUpdateDTO.phone());
        }
        if (userUpdateDTO.cpf() != null) {
            user.setCpf(userUpdateDTO.cpf());
        }
        if (userUpdateDTO.cnpj() != null) {
            user.setCnpj(userUpdateDTO.cnpj());
        }
        user.setUpdatedAt(LocalDateTime.now());

        if (user instanceof Producer) {
            Producer producer = (Producer) user;

            if (userUpdateDTO.productionType() != null) {
                producer.setProductionType(ProductionType.valueOf(userUpdateDTO.productionType()));
            }
            if (userUpdateDTO.description() != null) {
                producer.setDescription(userUpdateDTO.description());
            }
        }

        User updatedUser = userRepository.save(user);
        return UserResponseDTO.fromEntity(updatedUser);
    }
}
