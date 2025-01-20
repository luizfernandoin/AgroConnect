package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Application.ApplicationDTO;
import com.campus_mobile.agroconnect.dto.User.UserReviewResponseDTO;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.*;
import com.campus_mobile.agroconnect.repository.ApplicationRepository;
import com.campus_mobile.agroconnect.repository.OpportunityRepository;
import com.campus_mobile.agroconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OpportunityRepository opportunityRepository;

    public List<ApplicationDTO> getApplicationsByOpportunity(UUID opportunityId) {
        List<Application> applications = applicationRepository.findByOpportunityId(opportunityId);

        return applications.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public List<ApplicationDTO> getApplicationsForUser(UUID userId) {
        List<Application> applications = applicationRepository.findByUserId(userId);
        return applications.stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    public void applyToOpportunity(UUID userId, UUID opportunityId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Opportunity opportunity = opportunityRepository.findById(opportunityId)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found"));

        ApplicationId applicationId = new ApplicationId(
                user.getId(),
                opportunity.getId()
        );

        if (applicationRepository.existsById(applicationId)) {
            throw new IllegalArgumentException("User has already applied to this opportunity");
        }

        Application application = new Application(
                applicationId,
                user,
                opportunity
        );

        applicationRepository.save(application);
    }

    public ApplicationDTO convertToResponseDTO(Application application) {
        return new ApplicationDTO(
                application.getUser().getId(),
                application.getOpportunity().getId(),
                application.getAppliedAt(),
                application.getStatus()
        );
    }
}
