package com.edumingle.backend.services;

import com.edumingle.backend.models.Subjects;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface SubjectService {
    List<Subjects> getSubjectByGrade(int grade);

    List<Subjects> getAllSubjects();

    Optional<Subjects> getSubjectById(Long subjectId);

    List<Subjects> getSubjectsByGradeId(Long gradeId);
}
