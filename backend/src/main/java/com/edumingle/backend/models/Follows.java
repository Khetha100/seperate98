package com.edumingle.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@IdClass(FollowsId.class)
public class Follows {
    @Id
    @ManyToOne
    @JoinColumn(name = "followerId", nullable = false)
    private UserInfo follower;

    @Id
    @ManyToOne
    @JoinColumn(name = "followedId", nullable = false)
    private UserInfo followed;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Follows() {}

    public Follows(UserInfo follower, UserInfo followed) {
        this.follower = follower;
        this.followed = followed;
        this.createdAt = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
