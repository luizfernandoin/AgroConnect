package com.campus_mobile.agroconnect.services;


import com.campus_mobile.agroconnect.exceptions.ResourceNotFoundException;
import com.campus_mobile.agroconnect.model.Opportunity;
import com.campus_mobile.agroconnect.repository.OpportunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OpportunityService {
    @Autowired
    private OpportunityRepository opportunityRepository;

    public Opportunity getOpportunityById(UUID id) {
        return opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Oportunidade não encontrado com id: " + id));
    }

    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAll();
    }
}
