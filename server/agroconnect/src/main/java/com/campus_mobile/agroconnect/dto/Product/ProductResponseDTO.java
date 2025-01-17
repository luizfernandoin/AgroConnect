package com.campus_mobile.agroconnect.dto.Product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductResponseDTO(
    String name,

    String description,

    @NotBlank(message = "Price is required")
    @DecimalMin(value = "0.01", inclusive = true, message = "Price must be a positive value")
    BigDecimal price,

    @Size(max = 50, message = "Unit of measure cannot exceed 50 characters")
    String unitMeasure,

    @Min(value = 0, message = "Quantity cannot be negative")
    Integer quantity,

    @Size(max = 255, message = "Image URL cannot exceed 255 characters")
    String image,

    @NotBlank(message = "Status is required")
    Boolean status
) {
}
