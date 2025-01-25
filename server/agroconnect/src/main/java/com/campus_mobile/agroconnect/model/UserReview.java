package com.campus_mobile.agroconnect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserReview {
    @EmbeddedId
    private UserReviewId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reviewerId")
    private User reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("reviewedUserId")
    private User reviewedUser;

    @Column(nullable = false)
    private int rating;

    @Column
    private String comment;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public UserReview(UserReviewId id, User reviewer, User reviewedUser, int rating, String comment) {
        this.id = id;
        this.reviewer = reviewer;
        this.reviewedUser = reviewedUser;
        this.rating = rating;
        this.comment = comment;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
