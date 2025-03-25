package com.edumingle.backend.dtos;

import com.edumingle.backend.models.Community;
import com.edumingle.backend.models.UserInfo;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommunityDTO {

    private Long id;
    private String name;
    private String description;
    private String pubOrPriv;
    private int communityCreatorId;
    private String communityPicture;
    private int communityMembersNumber;
    private List<Long> userIds;

    public CommunityDTO(Community community) {
        this.id = community.getId();
        this.name = community.getName();
        this.description = community.getDescription();
        this.pubOrPriv = community.getPubOrPriv();
        this.communityCreatorId = community.getCommunityCreatorId();
        this.communityPicture = community.getCommunityPicture();
        this.communityMembersNumber = community.getCommunityMembersNumber();

        this.userIds = new ArrayList<>();
        for (UserInfo user : community.getUsers()) {
            this.userIds.add(Long.valueOf(user.getId()));
        }
    }
}
