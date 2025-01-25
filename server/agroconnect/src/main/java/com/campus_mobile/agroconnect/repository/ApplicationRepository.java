package com.campus_mobile.agroconnect.repository;

import com.campus_mobile.agroconnect.model.Application;
import com.campus_mobile.agroconnect.model.ApplicationId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ApplicationRepository extends JpaRepository<Application, ApplicationId> {
    List<Application> findByUserId(UUID userId);
    List<Application> findByOpportunityId(UUID opportunityId);
}