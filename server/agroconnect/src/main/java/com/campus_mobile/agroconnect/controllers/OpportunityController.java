package com.campus_mobile.agroconnect.controllers;


import com.campus_mobile.agroconnect.model.Opportunity;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.services.OpportunityService;
import com.campus_mobile.agroconnect.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {
    @Autowired
    private OpportunityService opportunityService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Opportunity>> getOpportunityById(@PathVariable UUID id) {
        Opportunity opportunity = opportunityService.getOpportunityById(id);

        Response<Opportunity> response = new Response<>("success", "Opportunity found", opportunity);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<Opportunity> getAllOpportunities() {
        return opportunityService.getAllOpportunities();
    }
}
