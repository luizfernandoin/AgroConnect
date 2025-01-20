package com.campus_mobile.agroconnect.dto.Application;

import java.time.LocalDateTime;
import java.util.UUID;

public record ApplicationDTO(
    UUID userId,
    UUID opportunityId,
    LocalDateTime appliedAt,
    String status
) {
}
