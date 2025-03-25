package com.edumingle.backend.services;

import com.edumingle.backend.dtos.CommunityUserRoleDTO;
import com.edumingle.backend.models.Comments;
import com.edumingle.backend.models.Community;
import com.edumingle.backend.models.CommunityUserRole;
import com.edumingle.backend.models.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommunityService {
    List<Community> getAllCommunities();

    Community getOneCommunity(Long id);

    Community addACommunity(Community community);

    Community editACommunity(Community community);

    CommunityUserRole addMemberToCommunity(CommunityUserRoleDTO communityUserRole);

//    UserInfo addMemberToCommunity(CommunityUserRole communityUserRole);

    List<UserInfo> getAllCommunityUsers(Integer id);

    List<CommunityUserRole> getAllCommunityUserRole();

    String deleteCommunityMember(int id);

}
