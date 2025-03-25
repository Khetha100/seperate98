package com.edumingle.backend.controllers;

import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.FollowServiceImpl;
import com.edumingle.backend.services.impl.NotificationServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/follows")
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE}, allowCredentials = "true")
public class FollowController {
    private final FollowServiceImpl followService;
    private final NotificationServiceImpl notificationsService;

    public FollowController(FollowServiceImpl followService, NotificationServiceImpl notificationsService) {
        this.followService = followService;
        this.notificationsService = notificationsService;
    }

    @PostMapping("/follow")
    public ResponseEntity<String> followUser(
            @RequestParam Integer followerId,
            @RequestParam Integer followedId
    ) {
        boolean success = followService.followUser(followerId, followedId);
        if (success) {
            notificationsService.createNotification(new UserInfo(followedId), "You have a new follower!");
            return ResponseEntity.ok("Follow request successful");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to follow user");
    }

    @DeleteMapping("/unfollow")
    public ResponseEntity<String> unfollowUser(
            @RequestParam Integer followerId,
            @RequestParam Integer followedId
    ) {
        boolean success = followService.unfollowUser(followerId, followedId);
        if (success) {
            return ResponseEntity.ok("Unfollow successful");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to unfollow user");
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserInfo>> getFollowers(@PathVariable Integer userId) {
        List<UserInfo> followers = followService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserInfo>> getFollowing(@PathVariable Integer userId) {
        List<UserInfo> following = followService.getFollowing(userId);
        return ResponseEntity.ok(following);
    }
}

