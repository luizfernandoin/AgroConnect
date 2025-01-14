package com.campus_mobile.agroconnect.dto.User;

import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.model.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        String image,
        String phone,
        UserRole role,
        LocalDateTime dtCadastro,
        LocalDateTime dtAtualizacao
) {
    public static UserResponseDTO fromEntity(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getImage(),
                user.getPhone(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

}