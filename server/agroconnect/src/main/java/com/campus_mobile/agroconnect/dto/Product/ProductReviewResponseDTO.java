package com.campus_mobile.agroconnect.dto.Product;

import java.util.UUID;

public record ProductReviewResponseDTO(
        UUID reviewerId,
        String reviewerName,
        int rating,
        String comment
) {

}
