package com.edumingle.backend.services;

import com.edumingle.backend.models.Grades;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface GradeService {
    List<Grades> getAllGrades();

    Optional<Grades> getGradeById(Integer id);
}
