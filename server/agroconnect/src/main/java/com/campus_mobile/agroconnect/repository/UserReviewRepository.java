package com.campus_mobile.agroconnect.repository;

import com.campus_mobile.agroconnect.model.UserReview;
import com.campus_mobile.agroconnect.model.UserReviewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, UserReviewId> {
    List<UserReview> findByReviewedUserId(UUID reviewedUserId);
}
