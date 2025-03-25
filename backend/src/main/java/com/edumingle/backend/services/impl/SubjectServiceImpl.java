package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Subjects;
import com.edumingle.backend.repositories.SubjectRepository;
import com.edumingle.backend.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Override
    public List<Subjects> getSubjectByGrade(int grade) {
        return subjectRepository.findByGrade(grade);
    }

    @Override
    public List<Subjects> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @Override
    public Optional<Subjects> getSubjectById(Long subjectId) {
        return Optional.empty();
    }

    @Override
    public List<Subjects> getSubjectsByGradeId(Long gradeId) {
        return List.of();
    }
}
