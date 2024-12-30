package com.campus_mobile.agroconnect.dto.Authentication;

import org.springframework.web.multipart.MultipartFile;

public record RegisterDTO(String name, String email, String password, MultipartFile image, String phone, String cpf, String cnpj, String role) {
}
