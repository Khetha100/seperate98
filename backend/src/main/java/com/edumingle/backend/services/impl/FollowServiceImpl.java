package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Follows;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.FollowsRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.FollowService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class FollowServiceImpl implements FollowService {
    private final FollowsRepository followsRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public FollowServiceImpl(FollowsRepository followsRepository, UserInfoRepository userInfoRepository) {
        this.followsRepository = followsRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public boolean followUser(Integer followerId, Integer followedId) {
        UserInfo follower = userInfoRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Follower not found"));
        UserInfo followed = userInfoRepository.findById(followedId)
                .orElseThrow(() -> new RuntimeException("Followed user not found"));

        if (followsRepository.existsByFollower_IdAndFollowed_Id(followerId, followedId)) {
            throw new RuntimeException("Already following this user");
        }

        Follows follow = new Follows(follower, followed);
        followsRepository.save(follow);
        return true;
    }

    @Override
    public boolean unfollowUser(Integer followerId, Integer followedId) {
        // Fetch the follow relationship if it exists
        Follows follow = followsRepository.findByFollower_IdAndFollowed_Id(followerId, followedId);

        if (follow != null) {
            // Delete the follow relationship if it exists
            followsRepository.delete(follow);
            return true;
        }

        // If no relationship exists, return false
        return false;
    }

    @Override
    public List<UserInfo> getFollowers(Integer userId) {
        return followsRepository.findByFollowed_Id(userId);
    }

    @Override
    public List<UserInfo> getFollowing(Integer userId) {
        return followsRepository.findByFollower_Id(userId);
    }
}