package com.admin.server.services;

import com.edumingle.backend.models.Donation;
import com.edumingle.backend.repositories.DonationRepository;
import com.edumingle.backend.services.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AdminDonationService {

    @Autowired
    private DonationService donationService;

    @Autowired
    private DonationRepository donationRepository;

    public Map<String, Object> getDonationSummary() {
        Map<String, Object> summary = new HashMap<>();

        // Get total donations amount
        BigDecimal totalDonations = donationRepository.sumTotalDonations();
        if (totalDonations == null) totalDonations = BigDecimal.ZERO;
        summary.put("totalDonations", totalDonations.doubleValue());

        // Get top donor
        List<Donation> topDonors = donationRepository.findTopDonors();
        Map<String, Object> topDonor = new HashMap<>();
        if (!topDonors.isEmpty()) {
            Donation top = topDonors.get(0);
            topDonor.put("fullName", top.getFullName());
            topDonor.put("email", top.getEmail());
            topDonor.put("amount", top.getAmount().doubleValue());
        } else {
            topDonor.put("fullName", "N/A");
            topDonor.put("email", "N/A");
            topDonor.put("amount", 0);
        }
        summary.put("topDonor", topDonor);

        // Get donor count
        Long donorCount = donationRepository.countDistinctDonors();
        summary.put("donorCount", donorCount != null ? donorCount : 0);

        return summary;
    }

    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    public Map<String, Object> getDonationStats() {
        return donationService.getDonationStats();
    }
}

