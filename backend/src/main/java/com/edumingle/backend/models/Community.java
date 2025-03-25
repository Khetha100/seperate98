package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
public class Community implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "communityId")
    private Long id;

    private String name;
    private String description;

    @Column(name="isPrivate")
    private String pubOrPriv;

//    @ManyToMany
//    @JoinTable(
//            name = "userCommunity",  // The join table name
//            joinColumns = @JoinColumn(name = "communityId"),  // The foreign key in the join table for the Community entity
//            inverseJoinColumns = @JoinColumn(name = "userId")  // The foreign key in the join table for the UserInfo entity
//    )
//    @JsonManagedReference
//    private List<UserInfo> users;

    @ManyToMany
    @JoinTable(
            name = "userCommunity",  // The join table name
            joinColumns = @JoinColumn(name = "communityId"),  // The foreign key in the join table for the Community entity
            inverseJoinColumns = @JoinColumn(name = "userId")  // The foreign key in the join table for the UserInfo entity
    )
    @JsonIgnore
    private Set<UserInfo> users;


    private int communityCreatorId;
    private String communityPicture;

    private int communityMembersNumber;

}
