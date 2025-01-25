package com.campus_mobile.agroconnect.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class ApplicationId implements Serializable {
    @Column(name = "user_id")
    private UUID userId;
    @Column(name = "opportunity_id")
    private UUID opportunityId;
}
