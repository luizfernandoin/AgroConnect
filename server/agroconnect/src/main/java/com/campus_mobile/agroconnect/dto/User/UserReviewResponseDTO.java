package com.campus_mobile.agroconnect.dto.User;

import java.util.UUID;


public record UserReviewResponseDTO(
        UUID reviewerId,
        String reviewerName,
        int rating,
        String comment
) {

}