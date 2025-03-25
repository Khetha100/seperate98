package com.admin.server.controllers;

import com.admin.server.services.AdminUserService;
import com.admin.server.services.AdminContentService;
import com.edumingle.backend.services.CommunityService;
import com.edumingle.backend.services.DonationService;
import com.edumingle.backend.services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/adminAuth/dashboard")
@CrossOrigin(origins = "http://localhost:4000")
public class AdminController {

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private AdminContentService adminContentService;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private DonationService donationService;


    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() throws NoSuchAlgorithmException {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalUsers", userInfoService.getAllUsers());
        summary.put("reportedContent", adminContentService.getReportedContentCount());
        summary.put("totalCommunities", communityService.getAllCommunities() );
        summary.put("totalDonations", donationService.getAllDonations());
        return ResponseEntity.ok(summary);
    }

}