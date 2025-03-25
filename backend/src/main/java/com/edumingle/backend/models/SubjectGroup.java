package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class SubjectGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private int startGrade;
    private int endGrade;

    @OneToMany(mappedBy = "subjectGroup")
    @JsonIgnore
    private List<Subjects> subjects;
}
