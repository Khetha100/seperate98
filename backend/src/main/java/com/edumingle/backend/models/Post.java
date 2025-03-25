package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String imageUrl;
    private String name;
    private String description;
    private LocalDateTime date;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comments> comments;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserInfo userInfo;

    @OneToMany(mappedBy = "post")
    @JsonIgnore
    private Set<PostLikes> postLikes;

    //Required by admin
    private boolean reported;

    private Date reportedDate;

    public Post(Integer id) {
        this.id = id;
    }

    public Post() {

    }

//    public Post(Integer postId) {
//    }
}
