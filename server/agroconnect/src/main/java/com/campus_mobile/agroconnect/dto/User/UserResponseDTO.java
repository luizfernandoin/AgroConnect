package com.campus_mobile.agroconnect.dto.User;

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
        String password,
        String image,
        String phone,
        String cpf,
        String cnpj,
        UserRole role,
        LocalDateTime dtCadastro,
        LocalDateTime dtAtualizacao
) {
}