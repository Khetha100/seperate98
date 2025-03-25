package com.edumingle.backend.dtos;

import com.edumingle.backend.models.Donation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationDTO {
    private Long id;
    private String fullName;
    private String email;
    private BigDecimal amount;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    public static DonationDTO fromEntity(Donation donation) {
        DonationDTO dto = new DonationDTO();
        dto.setId(donation.getId());
        dto.setFullName(donation.getFullName());
        dto.setEmail(donation.getEmail());
        dto.setAmount(donation.getAmount());
        dto.setStatus(donation.getStatus());
        dto.setCreatedAt(donation.getCreatedAt());
        dto.setCompletedAt(donation.getCompletedAt());
        return dto;
    }
}
