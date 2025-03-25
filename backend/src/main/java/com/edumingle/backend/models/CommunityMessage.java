package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@ToString
public class CommunityMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String content;
    private LocalDateTime date;
    private Long senderId;
    private Long communityId;
    private String SubscriptionChannel;

    @ManyToOne
    @JoinColumn(name = "discussionId")
    @JsonBackReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Discussion discussion;

    public CommunityMessage(String s) {
    }

    public CommunityMessage() {

    }
}
