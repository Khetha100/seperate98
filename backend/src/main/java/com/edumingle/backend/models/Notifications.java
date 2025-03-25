package com.edumingle.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Notifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "userId", nullable = false)
    private UserInfo user;

    private String message;
    private boolean readStatus = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Notifications(UserInfo user, String message) {
        this.user = user;
        this.message = message;
    }

    public Notifications() {

    }
}