package com.edumingle.backend.dtos;

import com.edumingle.backend.models.CommunityUserRole;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommunityUserRoleDTO extends CommunityUserRole {
    private int communityId;

    private int userInfoId;
}
