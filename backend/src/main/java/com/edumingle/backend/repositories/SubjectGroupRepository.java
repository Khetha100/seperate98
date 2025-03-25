package com.edumingle.backend.repositories;

import com.edumingle.backend.models.SubjectGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectGroupRepository extends JpaRepository<SubjectGroup, Integer> {
}
