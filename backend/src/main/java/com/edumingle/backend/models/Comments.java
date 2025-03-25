package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserInfo user;

    private String name;
    private String description;
    private Long numberOfLikes;
    private LocalDateTime timePosted;
    private Integer postsId;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;
}
