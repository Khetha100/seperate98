package com.edumingle.backend.services;

import com.edumingle.backend.models.UserInfo;

import java.util.List;

public interface FollowService {
    boolean followUser(Integer followerId, Integer followedId);

    boolean unfollowUser(Integer followerId, Integer followedId);

    List<UserInfo> getFollowers(Integer userId);

    List<UserInfo> getFollowing(Integer userId);
}
