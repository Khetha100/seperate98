package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class Subjects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "subjectGroupId")
    @JsonIgnoreProperties("subjects")
    private SubjectGroup subjectGroup;

    @ManyToMany
    @JoinTable(
            name = "userSubjects",  // Join table name
            joinColumns = @JoinColumn(name = "subjectId"),  // Foreign key to the Subjects entity
            inverseJoinColumns = @JoinColumn(name = "userId")  // Foreign key to the UserInfo entity
    )
    private Set<UserInfo> users;
}
