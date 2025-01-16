package com.campus_mobile.agroconnect.controllers;


import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityRegisterDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityResponseDTO;
import com.campus_mobile.agroconnect.dto.Opportunity.OpportunityUpdateDTO;
import com.campus_mobile.agroconnect.model.Opportunity;
import com.campus_mobile.agroconnect.model.Producer;
import com.campus_mobile.agroconnect.model.User;
import com.campus_mobile.agroconnect.services.OpportunityService;
import com.campus_mobile.agroconnect.services.UserService;
import com.campus_mobile.agroconnect.utils.Response;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {
    @Autowired
    private OpportunityService opportunityService;
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<Response<Opportunity>> getOpportunityById(@PathVariable UUID id) {
        Opportunity opportunity = opportunityService.getOpportunityById(id);

        Response<Opportunity> response = new Response<>("success", "Opportunity found", opportunity);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public List<OpportunityResponseDTO> getAllOpportunities() {
        return opportunityService.getAllOpportunities();
    }

    @PostMapping("/")
    @Secured("ROLE_PRODUCER")
    public ResponseEntity<OpportunityResponseDTO> createOpportunity(
            Authentication authentication,
            @Valid @RequestBody OpportunityRegisterDTO data) {

        User user = userService.getUserFromAuthentication(authentication);
        System.out.println(user);
        System.out.println(data);

        if (!(user instanceof Producer)) {
            throw new IllegalArgumentException("Authenticated user is not a producer.");
        }

        Producer producer = (Producer) user;

        OpportunityResponseDTO responseDTO = opportunityService.createOpportunity(data, producer);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_PRODUCER")
    public ResponseEntity<Response<OpportunityResponseDTO>> deleteOpportunity(Authentication authentication, @PathVariable UUID id) {
        User user = userService.getUserFromAuthentication(authentication);

        if (!(user instanceof Producer)) {
            throw new IllegalArgumentException("Authenticated user is not a producer.");
        }

        Producer producer = (Producer) user;

        OpportunityResponseDTO deletedOpportunity = opportunityService.deleteOpportunity(id, producer);

        Response<OpportunityResponseDTO> response = new Response<>("success", "Opportunity deleted successfully", deletedOpportunity);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}")
    @Secured("ROLE_PRODUCER")
    public ResponseEntity<Response<OpportunityResponseDTO>> updateOpportunity(
            Authentication authentication,
            @PathVariable UUID id,
            @RequestBody OpportunityUpdateDTO data) {

        OpportunityResponseDTO updatedOpportunity = opportunityService.updateOpportunity(id, data);

        Response<OpportunityResponseDTO> response = new Response<>("success", "Opportunity successfully updated", updatedOpportunity);
        return ResponseEntity.ok(response);
    }
}
