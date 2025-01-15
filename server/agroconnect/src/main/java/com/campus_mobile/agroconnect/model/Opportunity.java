package com.campus_mobile.agroconnect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "opportunities")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "value", nullable = false)
    private Double value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producer_id", nullable = false)
    private Producer producer;

    @Column(name = "publication_date", nullable = false)
    private LocalDateTime publicationDate;

    public Opportunity(
            String title,
            String description,
            String type,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Double value,
            Producer producer) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.value = value;
        this.producer = producer;
    }

    @PrePersist
    protected void onCreate() {
        if (publicationDate == null) {
            publicationDate = LocalDateTime.now();
        }
    }
}
