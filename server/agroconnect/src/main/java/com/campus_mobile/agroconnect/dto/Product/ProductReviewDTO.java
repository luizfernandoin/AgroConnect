package com.campus_mobile.agroconnect.dto.Product;

import java.util.UUID;

public record ProductReviewDTO(
        int rating,
        String comment
) {
}
