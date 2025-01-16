package com.campus_mobile.agroconnect.services;


import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityRegisterDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.Opportunity;
import com.campus_mobile.agroconnect.model.Producer;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.repository.OpportunityRepository;
import com.campus_mobile.agroconnect.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        if (!opportunity.getProducer().equals(producer)) {
            throw new SecurityException("You are not allowed to delete this opportunity");
        }

        opportunityRepository.delete(opportunity);

        return convertToResponseDTO(opportunity);
    }

    private OpportunityResponseDTO convertToResponseDTO(Opportunity opportunity) {
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
