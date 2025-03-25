package com.edumingle.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class Grades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "userGrades",  // Join table name
            joinColumns = @JoinColumn(name = "gradeId"),  // Foreign key to the Grades entity
            inverseJoinColumns = @JoinColumn(name = "userId")  // Foreign key to the UserInfo entity
    )
    private Set<UserInfo> users;
}
