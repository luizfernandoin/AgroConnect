package com.campus_mobile.agroconnect.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "producers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@PrimaryKeyJoinColumn(name = "user_id")
public class Producer extends User {
    @Enumerated(EnumType.STRING)
    @Column(name = "production_type", nullable = false, length = 50)
    private ProductionType productionType;

    @Column(name = "rating", nullable = false)
    private Double rating;

    @Column(name = "description", length = 255, nullable = false)
    private String description;

    public Producer(ProductionType productionType, String description) {
        this.productionType = productionType;
        this.description = description;
    }

    @PrePersist
    protected void onCreate() {
        super.onCreate();

        if (this.rating == null) {
            this.rating = 0.0;
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Producer producer = (Producer) obj;
        return this.getId().equals(producer.getId());
    }

}
