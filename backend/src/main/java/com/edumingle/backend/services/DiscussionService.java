package com.edumingle.backend.services;

import com.edumingle.backend.dtos.CommunityDiscussionDTO;
import com.edumingle.backend.models.Comments;
import com.edumingle.backend.models.Discussion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiscussionService {
    List<Discussion> getAllDiscussions();

    List<Discussion> getAllDiscussionsByCommunityId(int communityId);

    Discussion addADiscussion(CommunityDiscussionDTO communityDiscussionDTO);

    List<Discussion> searchDiscussions(String keyword);
}
