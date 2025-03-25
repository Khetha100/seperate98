package com.edumingle.backend.services.impl;

import com.edumingle.backend.dtos.CommunityDiscussionDTO;
import com.edumingle.backend.dtos.DeleteDiscussionDTO;
import com.edumingle.backend.dtos.DeleteMessageDTO;
import com.edumingle.backend.models.Community;
import com.edumingle.backend.models.Discussion;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.CommunityRepository;
import com.edumingle.backend.repositories.DiscussionRepository;
import com.edumingle.backend.repositories.MessageRepository;

import com.edumingle.backend.services.DiscussionService;
import com.edumingle.backend.repositories.UserInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class DiscussionServiceImpl implements DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final CommunityRepository communityRepository;
    private UserInfoRepository userInfoRepository;
    private MessageRepository messageRepository;


    @Autowired
    public DiscussionServiceImpl(DiscussionRepository discussionRepository, CommunityRepository communityRepository, UserInfoRepository userInfoRepository,MessageRepository messageRepository) {
        this.discussionRepository = discussionRepository;
        this.communityRepository = communityRepository;
        this.userInfoRepository = userInfoRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Discussion> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    @Override
    public List<Discussion> getAllDiscussionsByCommunityId(int communityId) {
        System.out.println("ABOUT TO GET ALL DISCUSSIONS");
//        Community community = communityRepository.findById(Long.valueOf(communityId)).orElse(null);
        List<Discussion> ls = discussionRepository.findByCommunityId(communityId);
        System.out.println(ls);
        return ls;
    }

    @Override
    public Discussion addADiscussion(CommunityDiscussionDTO communityDiscussionDTO) {
        Community community = communityRepository.findById((long) communityDiscussionDTO.getCommunityId())
                .orElseThrow(() -> new IllegalArgumentException("Community not found"));

        UserInfo userInfo = userInfoRepository.findById( communityDiscussionDTO.getUserInfoId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Discussion discussion = new Discussion();
        discussion.setTitle(communityDiscussionDTO.getTitle());
        discussion.setDescription(communityDiscussionDTO.getDescription());
        discussion.setSubscriptionChannel(communityDiscussionDTO.getSubscriptionChannel());

        discussion.setCommunity(community);
        discussion.setUserInfo(userInfo);
        Discussion discussion1 = discussionRepository.save(discussion);
        System.out.println(discussion1);

        return discussion1;
    }

    @Override
    public List<Discussion> searchDiscussions(String keyword) {
        return discussionRepository.searchDiscussions(keyword);
    }

    public DeleteDiscussionDTO deleteDiscussion(int id){
        System.out.println("ID IS: ");
        System.out.println(id);
        messageRepository.deleteByDiscussionId(id);
        discussionRepository.deleteById(id);
        if(discussionRepository.findById(id).orElse(null) == null){
            return new DeleteDiscussionDTO(HttpStatus.OK, "Discussion deletion successful");
        }
        return new DeleteDiscussionDTO(HttpStatus.OK, "Discussion deletion unsuccessful");
    }

    public DeleteMessageDTO deleteDiscussionMessage(int id){
        messageRepository.deleteById(id);

        if(messageRepository.findById(id).orElse(null) == null){
            return new DeleteMessageDTO(HttpStatus.OK, "Message deletion successful");
        }
        return new DeleteMessageDTO(HttpStatus.OK, "Message deletion unsuccessful");
    }
}
