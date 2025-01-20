package com.campus_mobile.agroconnect.dto.User;

import com.campus_mobile.agroconnect.model.UserRole;
import com.campus_mobile.agroconnect.utils.validation.constraints.AtLeastOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.br.CNPJ;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.web.multipart.MultipartFile;


public record UserUploadDTO(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,
        @NotBlank(message = "Password is required")
        String password,
        MultipartFile image,
        String phone,
        @CPF(message = "Invalid cpf format")
        String cpf,
        @CNPJ(message = "Invalid cnpj format")
        String cnpj,
        String productionType,
        String description
) {
}
