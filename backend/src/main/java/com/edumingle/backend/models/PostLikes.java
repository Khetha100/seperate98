package com.edumingle.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "post_likes")
@IdClass(PostLikeId.class)
public class PostLikes {

    @Id
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserInfo userInfo;

    @Id
    @ManyToOne
    @JoinColumn(name = "postId", nullable = false)
    private Post post;

    private LocalDateTime createdAt = LocalDateTime.now();

    public PostLikes(UserInfo userInfo, Post post, LocalDateTime now) {
    }

    public PostLikes() {

    }

    public PostLikes(UserInfo userInfo, Post post) {
    }
}
