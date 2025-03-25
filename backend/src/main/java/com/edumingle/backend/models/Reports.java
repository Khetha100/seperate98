package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import org.apache.logging.log4j.message.Message;

@Setter
@Getter
@Entity
public class Reports {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ReportReason reason;

    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;

//    @ManyToOne
//    @JoinColumn(name = "userId")
//    private UserInfo user;

    private int userId;

//    @ManyToOne
//    @JoinColumn(name = "postId")
//    private Post post;

    private int postId;

    @Enumerated(EnumType.STRING)
    private ReportStatus status;

    // Add a setter for userId to allow setting UserInfo from frontend data
//    public void setUserId(UserInfo userInfo) {
//        this.user = userInfo;
//    }
}
