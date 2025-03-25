package com.edumingle.backend.dtos;

import com.edumingle.backend.models.Discussion;
import lombok.*;

//@Getter
//@Setter
//@ToString
//@AllArgsConstructor
//@NoArgsConstructor
//public class CommunityDiscussionDTO extends Discussion {
//    private int communityId;
//
//    private int userInfoId;
//}

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommunityDiscussionDTO {
    private Integer id; // Discussion ID
    private String title;
    private String description;
    private String subscriptionChannel;
    private int communityId; // Community ID
    private int userInfoId;  // UserInfo ID
}

