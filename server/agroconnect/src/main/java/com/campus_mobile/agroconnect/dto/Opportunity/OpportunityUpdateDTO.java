package com.campus_mobile.agroconnect.dto.Opportunity;

import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

public record OpportunityUpdateDTO(
        String title,
        @Size(max = 500, message = "Description must be at most 500 characters long")
        String description,
        String type,
        @FutureOrPresent(message = "Start date must be in the present or future")
        LocalDateTime startDate,
        @Future(message = "End date must be in the future")
        LocalDateTime endDate,
        @Positive(message = "Value must be greater than zero")
        Float value
) {
}
