package com.edumingle.backend.services;

import com.edumingle.backend.dtos.DonationDTO;
import com.edumingle.backend.models.Donation;
import com.edumingle.backend.repositories.DonationRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DonationService {

    private final DonationRepository donationRepository;

    @Autowired
    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public @NotNull List<Donation> getAllDonations() {
        List<Donation> donations = donationRepository.findAll();
//        return donations.stream()
//                .map(DonationDTO::fromEntity)
//                .collect(Collectors.toList());
        return donations;
    }

//    public abstract Donation saveDonation(Donation donation);
//
//    public abstract BigDecimal getTotalDonationAmount();
//
//    public abstract Long getDonorCount();
//
//    public abstract Donation getTopDonor();

    public Map<String, Object> getDonationStats() {
        List<Donation> completedDonations = donationRepository.findByStatus("completed");

        BigDecimal totalAmount = completedDonations.stream()
                .map(Donation::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalDonations = completedDonations.size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAmount", totalAmount);
        stats.put("totalDonations", totalDonations);
        stats.put("averageDonation", totalDonations > 0 ?
                totalAmount.divide(BigDecimal.valueOf(totalDonations), 2, RoundingMode.HALF_UP) :
                BigDecimal.ZERO);

        return stats;
    }
}
