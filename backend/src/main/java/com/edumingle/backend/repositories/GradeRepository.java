package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Grades;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grades, Integer> {
}
