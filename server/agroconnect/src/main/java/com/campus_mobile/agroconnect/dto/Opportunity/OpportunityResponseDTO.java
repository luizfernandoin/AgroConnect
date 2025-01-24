package com.campus_mobile.agroconnect.dto.Opportunity;

import com.campus_mobile.agroconnect.model.Producer;

import java.time.LocalDateTime;
import java.util.UUID;

public record OpportunityResponseDTO(
        UUID id,
        String title,
        String description,
        String type,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Float value,
        Producer producer,
        LocalDateTime publicationDate
) {
}
