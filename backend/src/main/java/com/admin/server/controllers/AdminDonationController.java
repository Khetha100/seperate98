package com.admin.server.controllers;

import com.admin.server.services.AdminDonationService;
import com.edumingle.backend.dtos.DonationDTO;
import com.edumingle.backend.models.Donation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/donations")
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
public class AdminDonationController {

    @Autowired
    private AdminDonationService adminDonationService;

    @GetMapping
    public ResponseEntity<List<DonationDTO>> getAllDonations() {
        List<Donation> donations = adminDonationService.getAllDonations();
        List<DonationDTO> dtos = donations.stream()
                .map(DonationDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDonationSummary() {
        return ResponseEntity.ok(adminDonationService.getDonationSummary());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDonationStats() {
        return ResponseEntity.ok(adminDonationService.getDonationStats());
    }
}

