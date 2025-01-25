package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Product.ProductReviewDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductReviewResponseDTO;
import com.campus_mobile.agroconnect.dto.User.UserReviewDTO;
import com.campus_mobile.agroconnect.dto.User.UserReviewResponseDTO;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.repository.UserRepository;
import com.campus_mobile.agroconnect.repository.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserReviewService {
    @Autowired
    private UserReviewRepository userReviewRepository;
    @Autowired
    private UserRepository userRepository;

    public List<UserReviewResponseDTO> getReviewsByUser(UUID reviewedId) {
        List<UserReview> reviews = userReviewRepository.findByReviewedUserId(reviewedId);
        return reviews.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public UserReview createReview(UUID reviewedId, User reviewer, UserReviewDTO reviewDTO) {
        User reviewed = userRepository.findById(reviewedId)
                .orElseThrow(() -> new ResourceNotFoundException("Reviewed not found"));

        UserReviewId reviewId = new UserReviewId(reviewed.getId(), reviewer.getId());

        if (userReviewRepository.existsById(reviewId)) {
            throw new IllegalArgumentException("Review already exists");
        }

        UserReview review = new UserReview(
                reviewId,
                reviewer,
                reviewed,
                reviewDTO.rating(),
                reviewDTO.comment()
        );

        return userReviewRepository.save(review);
    }

    public UserReviewResponseDTO convertToResponseDTO(UserReview userReview) {
        return new UserReviewResponseDTO(
                userReview.getReviewer().getId(),
                userReview.getReviewer().getName(),
                userReview.getRating(),
                userReview.getComment()
        );
    }
}
