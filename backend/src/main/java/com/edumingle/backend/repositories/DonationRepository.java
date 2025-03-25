package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByEmail(String email);

    Optional<Donation> findByStripeSessionId(String sessionId);

    Optional<Donation> findByStripePaymentIntentId(String paymentIntentId);

    List<Donation> findByStatus(String status);

    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.status = 'completed'")
    BigDecimal sumTotalDonations();

    @Query("SELECT COUNT(DISTINCT d.email) FROM Donation d WHERE d.status = 'completed'")
    Long countDistinctDonors();

    @Query("SELECT d FROM Donation d WHERE d.status = 'completed' ORDER BY d.amount DESC")
    List<Donation> findTopDonors();
}
