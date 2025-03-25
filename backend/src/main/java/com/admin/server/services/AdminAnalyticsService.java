package com.admin.server.services;

import com.admin.server.repositories.AdminAnalyticsRepository;
import com.edumingle.backend.models.Roles;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminAnalyticsService {

    @Autowired
    private AdminAnalyticsRepository adminAnalyticsRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    public long getNewUsersCount(Date startDate) {
        return adminAnalyticsRepository.countNewUsersInPeriod(startDate);
    }

    public Map<String, Long> getUserCountByRole() {
        List<Object[]> results = adminAnalyticsRepository.getUserCountByRole();
        return results.stream()
                .collect(Collectors.toMap(
                        row -> ((Roles) row[0]).toString(), // Adjust this line
                        row -> (Long) row[1]
                ));
    }


    public Map<String, Object> getCompleteAnalyticsData() {
        Map<String, Object> analyticsData = new HashMap<>();

        // Get user roles data
        Map<String, Long> roleCountMap = getUserCountByRole();
        analyticsData.put("userRoles", roleCountMap);

        // Calculate most active subject based on user interests or activities
        String mostActiveSubject = getMostActiveSubject();
        analyticsData.put("mostActiveSubject", mostActiveSubject);

        // Calculate user growth percentage
        String userGrowth = calculateUserGrowth();
        analyticsData.put("userGrowth", userGrowth);

        // Calculate community growth (study groups, forums, etc.)
        String communityGrowth = calculateCommunityGrowth();
        analyticsData.put("communityGrowth", communityGrowth);

        // Calculate resource sharing rate
        String resourceSharingRate = calculateResourceSharingRate();
        analyticsData.put("resourceSharingRate", resourceSharingRate);

        return analyticsData;
    }

    private String getMostActiveSubject() {
        // Implement logic to determine most active subject
        // This could be based on forum posts, study groups, or user interests
        // For now, return a placeholder
        return "Mathematics";
    }

    private String calculateUserGrowth() {
        // Calculate user growth percentage over the last month
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        Date oneMonthAgoDate = Date.from(oneMonthAgo.atZone(ZoneId.systemDefault()).toInstant());

        long newUsers = getNewUsersCount(oneMonthAgoDate);
        long totalUsers = userInfoRepository.count();

        if (totalUsers == 0) return "0%";

        double growthRate = ((double) newUsers / totalUsers) * 100;
        return String.format("%.1f%%", growthRate);
    }

    private String calculateCommunityGrowth() {
        // Calculate growth in communities
        // For now, return a placeholder
        return "12%";
    }

    private String calculateResourceSharingRate() {
        // Calculate the rate at which resources are being shared
        // For now, return a placeholder
        return "8%";
    }
}

