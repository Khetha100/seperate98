package com.edumingle.backend.models;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class
CommunityUserRole implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    //A user can be part of many communities thus having many roles
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    UserInfo userInfo;


    @ManyToOne
    @JoinColumn(name="community_id")
    private Community community;

    private String communityRole;


}
