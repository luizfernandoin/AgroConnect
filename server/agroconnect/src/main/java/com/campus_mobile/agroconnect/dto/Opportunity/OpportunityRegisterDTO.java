package com.campus_mobile.agroconnect.dto.Opportunity;

import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.br.CNPJ;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

public record OpportunityRegisterDTO(
        @NotBlank(message = "Title cannot be blank")
        String title,

        @Size(max = 500, message = "Description must be at most 500 characters long")
        String description,

        @NotBlank(message = "Type cannot be blank")
        String type,

        @FutureOrPresent(message = "Start date must be in the present or future")
        LocalDateTime startDate,

        @Future(message = "End date must be in the future")
        LocalDateTime endDate,

        @NotNull(message = "Value cannot be null")
        @Positive(message = "Value must be greater than zero")
        Float value,
        LocalDateTime publicationDate
) {
}
