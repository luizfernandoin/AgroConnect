package com.campus_mobile.agroconnect.dto.Product;

import jakarta.validation.constraints.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.UUID;

public record ProductRegisterDTO(
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 255, message = "Name must be between 3 and 255 characters")
    String name,

    @NotBlank(message = "Description is required")
    @Size(min = 10, message = "Description must be at least 10 characters long")
    String description,

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be a positive value")
    BigDecimal price,

    @Size(max = 50, message = "Unit of measure cannot exceed 50 characters")
    String unitMeasure,

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    Integer quantity,

    MultipartFile image,

    @NotNull(message = "Status is required")
    Boolean status
) {
}
