package com.admin.server.controllers;

import com.admin.server.services.AdminAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/analytics")
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
public class AdminAnalyticsController {

    @Autowired
    private AdminAnalyticsService adminAnalyticsService;

    @GetMapping("/newUsers")
    public ResponseEntity<Long> getNewUsersCount(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate) {
        return ResponseEntity.ok(adminAnalyticsService.getNewUsersCount(startDate));
    }

    @GetMapping("/userRoles")
    public ResponseEntity<Map<String, Object>> getUserCountByRole() {
        // Return complete analytics data instead of just user roles
        return ResponseEntity.ok(adminAnalyticsService.getCompleteAnalyticsData());
    }

    @GetMapping("/data")
    public ResponseEntity<Map<String, Object>> getCompleteAnalyticsData() {
        return ResponseEntity.ok(adminAnalyticsService.getCompleteAnalyticsData());
    }
}

