package com.edumingle.backend.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@NoArgsConstructor
@ToString(exclude = {"communities"})
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    private String bio;
//
//    @Getter
//    @Setter
//    @Column(name = "image", columnDefinition = "LONGTEXT" , nullable = false)
    @Lob
    private String imageUrl;

    @Column(name = "phoneNumber", nullable = false, unique = true)
    private String phone;

    @Column(name = "saceNumber", unique = false, nullable = true)
    private String saceNumber;

    @Column(name = "password", nullable = false, unique = true, length = 2048)
    private String password;


    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Badges badges;

//    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
//    @JsonBackReference
//    private List<Community> communities;

    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Community> communities;

    @ManyToMany(mappedBy = "users", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Grades> grades;

    @ManyToMany(mappedBy = "users", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<Subjects> subjects;

    @OneToMany(mappedBy = "userInfo")
    @JsonIgnore
    private List<Post> postList;

    @Enumerated(EnumType.STRING)
    private Roles role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reportId")
    private Reports report;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<Notifications> notifications;

    //These columns are needed by the admin side
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", nullable = false, updatable = false)
    private java.util.Date createdAt;

    @Column(name = "isTemporarilyDeleted", nullable = false)
    private boolean isTemporarilyDeleted = false;

    public UserInfo(Integer senderId) {
    }

    public UserInfo(String firstName, String lastName, String phone, String saceNumber, String password, Roles role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.saceNumber = saceNumber;
        this.password = password;
        this.role = role;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = new java.util.Date(); // Automatically set the creation date before persisting
    }

}
