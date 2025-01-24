package com.campus_mobile.agroconnect.services;


import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityRegisterDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityUpdateDTO;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.EntityType;
import com.campus_mobile.agroconnect.model.Opportunity;
import com.campus_mobile.agroconnect.model.Producer;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.repository.OpportunityRepository;
import com.campus_mobile.agroconnect.repository.ProducerRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OpportunityService {
    @Autowired
    private OpportunityRepository opportunityRepository;
    @Autowired
    private ProducerRepository producerRepository;
    @Autowired
    private OwnershipService ownershipService;

    public Opportunity getOpportunityById(UUID id) {
        return opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrado com id: " + id));
    }

    public List<OpportunityResponseDTO> getAllOpportunities() {
        return opportunityRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public OpportunityResponseDTO createOpportunity(OpportunityRegisterDTO data, Producer user) {
        Opportunity opportunity = new Opportunity(
                data.title(),
                data.description(),
                data.type(),
                data.startDate(),
                data.endDate(),
                data.value(),
                user
        );

        opportunityRepository.save(opportunity);

        return convertToResponseDTO(opportunity);
    }

    public OpportunityResponseDTO deleteOpportunity(UUID id, Producer producer) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrado com id: " + id));

        System.out.println(opportunity.getProducer());
        System.out.println(producer);
        if (!opportunity.getProducer().equals(producer)) {
            throw new SecurityException("You are not allowed to delete this opportunity");
        }

        ownershipService.verifyOwnership(opportunity.getProducer().getId());

        opportunityRepository.delete(opportunity);

        return convertToResponseDTO(opportunity);
    }

    @Transactional
    public OpportunityResponseDTO updateOpportunity(UUID id, OpportunityUpdateDTO data) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrado com id: " + id));

        if (data.title() != null) {
            opportunity.setTitle(data.title());
        }
        if (data.description() != null) {
            opportunity.setDescription(data.description());
        }
        if (data.type() != null) {
            opportunity.setType(data.type());
        }
        if (data.startDate() != null) {
            opportunity.setStartDate(data.startDate());
        }
        if (data.endDate() != null) {
            opportunity.setEndDate(data.endDate());
        }
        if (data.value() != null) {
            opportunity.setValue(data.value());
        }

        ownershipService.verifyOwnership(opportunity.getProducer().getId());

        Opportunity updatedOpportunity = opportunityRepository.save(opportunity);

        return convertToResponseDTO(updatedOpportunity);
    }

    public OpportunityResponseDTO convertToResponseDTO(Opportunity opportunity) {
        return new OpportunityResponseDTO(
                opportunity.getId(),
                opportunity.getTitle(),
                opportunity.getDescription(),
                opportunity.getType(),
                opportunity.getStartDate(),
                opportunity.getEndDate(),
                opportunity.getValue(),
                opportunity.getProducer(),
                opportunity.getPublicationDate()
        );
    }
}
