package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Badges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BadgeRepository extends JpaRepository<Badges, Long> {
    Optional<Badges> findByUserId(Long userId);
}