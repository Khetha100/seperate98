package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Grades;
import com.edumingle.backend.repositories.GradeRepository;
import com.edumingle.backend.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeServiceImpl implements GradeService {
    private final GradeRepository gradeRepository;

    @Autowired
    public GradeServiceImpl(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    @Override
    public List<Grades> getAllGrades() {
        return gradeRepository.findAll();
    }

    @Override
    public Optional<Grades> getGradeById(Integer id) {
        return gradeRepository.findById(id);
    }
}
