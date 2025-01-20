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
public class UserReviewId implements Serializable {
    @Column(name = "reviewer_id")
    private UUID reviewerId;
    @Column(name = "reviewed_id")
    private UUID reviewedUserId;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserReviewId that = (UserReviewId) o;
        return Objects.equals(reviewerId, that.reviewerId) && Objects.equals(reviewedUserId, that.reviewedUserId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reviewerId, reviewedUserId);
    }
}