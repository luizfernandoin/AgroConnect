package com.campus_mobile.agroconnect.repository;

import com.campus_mobile.agroconnect.model.ProductReview;
import com.campus_mobile.agroconnect.model.ProductReviewId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, ProductReviewId> {
    List<ProductReview> findByProductId(UUID productId);
}
