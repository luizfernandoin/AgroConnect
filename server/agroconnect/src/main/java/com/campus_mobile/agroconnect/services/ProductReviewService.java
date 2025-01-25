package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductReviewDTO;
import com.campus_mobile.agroconnect.dto.Product.ProductReviewResponseDTO;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.repository.ProductRepository;
import com.campus_mobile.agroconnect.repository.ProductReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductReviewService {
    @Autowired
    private ProductReviewRepository productReviewRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OwnershipService ownershipService;

    public List<ProductReviewResponseDTO> getReviewsByProduct(UUID productId) {
        List<ProductReview> reviews = productReviewRepository.findByProductId(productId);
        return reviews.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductReview createReview(UUID productId, User reviewer, ProductReviewDTO reviewDTO) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        ProductReviewId reviewId = new ProductReviewId(product.getId(), reviewer.getId());

        if (productReviewRepository.existsById(reviewId)) {
            throw new IllegalArgumentException("Review already exists");
        }

        ProductReview review = new ProductReview(
                reviewId,
                reviewer,
                product,
                reviewDTO.rating(),
                reviewDTO.comment()
        );

        return productReviewRepository.save(review);
    }

    public ProductReviewResponseDTO convertToResponseDTO(ProductReview productReview) {
        return new ProductReviewResponseDTO(
                productReview.getReviewer().getId(),
                productReview.getReviewer().getName(),
                productReview.getRating(),
                productReview.getComment()
        );
    }
}