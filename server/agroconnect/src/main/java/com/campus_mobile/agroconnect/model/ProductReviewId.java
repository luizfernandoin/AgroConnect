package com.campus_mobile.agroconnect.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ProductReviewId implements Serializable {
    @Column(name = "reviewer_id")
    private UUID reviewerId;

    @Column(name = "product_id")
    private UUID productId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductReviewId that = (ProductReviewId) o;
        return Objects.equals(productId, that.productId) && Objects.equals(reviewerId, that.reviewerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, reviewerId);
    }
}
