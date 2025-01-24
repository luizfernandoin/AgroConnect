package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.model.Opportunity;
import com.campus_mobile.agroconnect.model.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProducerService {
    @Autowired
    private OpportunityService opportunityService;

    public List<OpportunityResponseDTO> getOpportunitiesByProducer(Producer producer) {
        List<Opportunity> opportunities = producer.getOpportunities();

        return opportunities.stream()
                .map(opportunity -> opportunityService.convertToResponseDTO(opportunity))
                .collect(Collectors.toList());

    }
}
