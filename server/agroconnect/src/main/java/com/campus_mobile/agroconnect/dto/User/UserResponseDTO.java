package com.campus_mobile.agroconnect.dto.User;

import com.campus_mobile.agroconnect.model.Producer;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.model.UserRole;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        String image,
        String phone,
        UserRole role,
        LocalDateTime dtCadastro,
        LocalDateTime dtAtualizacao,
        String cpf,
        String cnpj,
        String productionType,
        String description
) {
    public static UserResponseDTO fromEntity(User user) {
        String productionType = null;
        String description = null;

        if (user instanceof Producer) {
            Producer producer = (Producer) user;
            productionType = producer.getProductionType().name();
            description = producer.getDescription();
        }

        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getImage(),
                user.getPhone(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt(),
                user.getCpf(),
                user.getCnpj(),
                productionType,
                description
        );
    }

}