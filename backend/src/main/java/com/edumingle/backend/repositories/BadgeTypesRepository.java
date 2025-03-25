package com.edumingle.backend.repositories;

import com.edumingle.backend.models.BadgeTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeTypesRepository extends JpaRepository<BadgeTypes, Integer> {
}
