package com.edumingle.backend.controllers;

import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.NotificationServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.edumingle.backend.services.impl.PostLikeServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("api/v1/posts/{postId}/likes")
@Slf4j
public class LikesController {
    private final PostLikeServiceImpl postLikeService;
    private final NotificationServiceImpl notificationsService;

    public LikesController(PostLikeServiceImpl postLikeService, NotificationServiceImpl notificationsService) {
        this.postLikeService = postLikeService;
        this.notificationsService = notificationsService;
    }

    @PostMapping
    public ResponseEntity<String> likePost(
            @PathVariable Integer postId, @RequestParam Integer userId
    ) {
        try {
            notificationsService.createNotification(new UserInfo(userId), "Someone has officially commented.");
            log.info("Notification sent successfully.");

            postLikeService.likePost(userId, postId);
            log.info("Post liked successfully.");

            return ResponseEntity.ok("Post liked successfully!");
        } catch (Exception e) {
            log.error("Error while liking the post or sending notification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> unlikePost(@PathVariable Integer postId, @RequestParam Integer userId) {
        postLikeService.unlikePost(userId, postId);
        return ResponseEntity.ok("Post unliked successfully!");
    }

}
