package com.campus_mobile.agroconnect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @EmbeddedId
    private ApplicationId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("opportunityId")
    private Opportunity opportunity;

    private LocalDateTime appliedAt = LocalDateTime.now();

    private String status = "PENDING";

    public Application(ApplicationId id, User user, Opportunity opportunity) {
        this.id = id;
        this.user = user;
        this.opportunity = opportunity;
    }
}