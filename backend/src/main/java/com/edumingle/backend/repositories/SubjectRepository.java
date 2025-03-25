package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subjects, Integer> {

    @Query("SELECT s FROM Subjects s JOIN s.subjectGroup sg WHERE :grade BETWEEN sg.startGrade AND sg.endGrade")
    List<Subjects> findByGrade(@Param("grade") int grade);





}
