package com.edumingle.backend.services.impl;

import com.edumingle.backend.dtos.BadgeDTO;
import com.edumingle.backend.dtos.CommunityUserRoleDTO;
import com.edumingle.backend.dtos.DeleteCommunityDTO;
import com.edumingle.backend.models.Community;
import com.edumingle.backend.models.CommunityUserRole;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.BadgeService;
import com.edumingle.backend.repositories.CommunityRepository;
import com.edumingle.backend.repositories.CommunityUserRoleRepository;
import com.edumingle.backend.repositories.DiscussionRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CommunityServiceImpl implements CommunityService {
    CommunityRepository communityRepository;

    CommunityUserRoleRepository communityUserRoleRepository;

    UserInfoRepository userInfoRepository;

    @Autowired
    DiscussionRepository discussionRepository;

    @Autowired
    public CommunityServiceImpl(CommunityRepository communityRepository, CommunityUserRoleRepository communityUserRoleRepository, UserInfoRepository userInfoRepository) {
        this.communityRepository = communityRepository;
        this.communityUserRoleRepository = communityUserRoleRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public List<Community> getAllCommunities() {
        List<Community> listOfCommunities = communityRepository.findAll();
//        System.out.println(listOfCommunities);
        return listOfCommunities;
    }

    @Override
    public Community getOneCommunity(Long id) {
        return communityRepository.findById(id).orElse(null);
    }

    @Override
    public Community addACommunity(Community community) {
        // Save the community
        Community savedCommunity = communityRepository.save(community);

        // Award the Community Builder badge
        BadgeDTO badgeDTO = new BadgeDTO();
        badgeDTO.setName("Community Builder");
        badgeDTO.setDescription("Created your first community! You're bringing minds together.");
        badgeDTO.setImageUrl("/badges/community-builder.png");


        return savedCommunity;
    };


    @Override
    public Community editACommunity(Community community) {
        communityRepository.findById(community.getId()).ifPresent(newCommunity ->{
            newCommunity.setDescription(community.getDescription());
            newCommunity.setName(community.getName());
            newCommunity.setPubOrPriv(community.getPubOrPriv());
        });

        return communityRepository.save(community);
    }

    @Override
    public CommunityUserRole addMemberToCommunity(CommunityUserRoleDTO communityUserRole){

        Community community = communityRepository.findById((long) communityUserRole.getCommunityId())
                .orElseThrow(() -> new IllegalArgumentException("Community not found"));

        UserInfo userInfo = userInfoRepository.findById( communityUserRole.getUserInfoId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        CommunityUserRole communityUserRole1 = new CommunityUserRole();
        communityUserRole1.setCommunityRole(communityUserRole.getCommunityRole());


        communityUserRole1.setCommunity(community);
        communityUserRole1.setUserInfo(userInfo);

        return communityUserRoleRepository.save(communityUserRole1);
    }

    @Override
    public List<UserInfo> getAllCommunityUsers(Integer id) {
        //        return communityUserRoleRepository.findByCommunityId(id);
        List<UserInfo> listOfUsers = new ArrayList<>();
        List<CommunityUserRole> listOfUserId = communityUserRoleRepository.findByCommunityId(id);
//        System.out.println(listOfUserId);

        for(CommunityUserRole i: listOfUserId){

            listOfUsers.add(i.getUserInfo());
        }
        return listOfUsers;
    }

    @Override
    public List<CommunityUserRole>  getAllCommunityUserRole(){
        List<CommunityUserRole> distinctComUserRole = new ArrayList<>();
        List<CommunityUserRole> allComUserRole = communityUserRoleRepository.findAll();
        for(CommunityUserRole distinct: allComUserRole){
            if(!distinctComUserRole.contains(distinct)){
                distinctComUserRole.add(distinct);
            }
        }
//        System.out.println(distinctComUserRole);
        return distinctComUserRole;
    }

    @Override
    public String deleteCommunityMember(int id) {
        communityUserRoleRepository.deleteById(id);
        if(communityUserRoleRepository.findById(id).orElse(null) == null){
            return "deletion successful";
        }
        return "deletion unsuccessful";
    }

    public DeleteCommunityDTO deleteCommunity(Long id){
        discussionRepository.deleteByCommunityId(Math.toIntExact(id));
        communityUserRoleRepository.deleteByCommunityId(Math.toIntExact(id));
        communityRepository.deleteById(id);
        if(communityRepository.findById(id).orElse(null) == null){
            return new DeleteCommunityDTO(HttpStatus.OK, "community deletion successful");
        }
        return new DeleteCommunityDTO(HttpStatus.OK, "community deletion failed");
    }
}
