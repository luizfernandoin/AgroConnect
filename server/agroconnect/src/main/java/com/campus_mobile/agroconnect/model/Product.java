package com.campus_mobile.agroconnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 50)
    private String unitMeasure;

    @Column(nullable = false)
    private Integer quantity = 0;

    @Column(length = 255)
    private String image;

    @Column(nullable = false)
    private Boolean status = true;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "id_producer", nullable = false)
    private Producer producer;

    public Product(
            String name,
            String description,
            BigDecimal price,
            String unitMeasure,
            Integer quantity,
            String image,
            Boolean status,
            Producer producer
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.unitMeasure = unitMeasure;
        this.quantity = quantity;
        this.image = image;
        this.status = status;
        this.producer = producer;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
