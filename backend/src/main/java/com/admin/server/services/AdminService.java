package com.admin.server.services;

import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.CommunityRepository;
import com.edumingle.backend.repositories.PostRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AdminService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommunityRepository communityRepository;

    public Map<String, Object> getDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalUsers", userInfoRepository.count());
        dashboardData.put("totalPosts", postRepository.count());
        dashboardData.put("totalCommunities", communityRepository.count());
        // Add more metrics as needed
        return dashboardData;
    }

    public List<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }
}

