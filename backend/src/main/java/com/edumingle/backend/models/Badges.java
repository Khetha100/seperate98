package com.edumingle.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "badges")
@Data
public class Badges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private String imageUrl;

    @Column(name = "date_granted")
    private LocalDateTime dateGranted;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserInfo user;

    @PrePersist
    protected void onCreate() {
        dateGranted = LocalDateTime.now();
    }
}
