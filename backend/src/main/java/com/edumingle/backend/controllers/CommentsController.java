package com.edumingle.backend.controllers;

import com.edumingle.backend.models.Comments;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.CommentsServiceImpl;
import com.edumingle.backend.services.impl.NotificationServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("/api/v1/comments")
public class CommentsController {

    private final CommentsServiceImpl commentsService;
    private final NotificationServiceImpl notificationsService;

    @Autowired
    public CommentsController(CommentsServiceImpl commentsService, NotificationServiceImpl notificationsService) {
        this.commentsService = commentsService;
        this.notificationsService = notificationsService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comments>> getAllCommentsByPostId(
        @PathVariable int postId,
            HttpServletRequest request
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
            System.out.println("Session ID: " + session.getId());
            System.out.println("User ID: " + userId);
        }
        return ResponseEntity.ok(commentsService.getCommentsService(postId));
    }

    @PostMapping
    public ResponseEntity<Object> addComments(
            @RequestBody Comments comments,
            HttpServletRequest request
    ){
        System.out.println(comments.toString());
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
            System.out.println("Session ID: " + session.getId());
            System.out.println("User ID: " + userId);
        }
        notificationsService.createNotification(new UserInfo(), "Someone has officially commented.");
        return ResponseEntity.ok(commentsService.addCommentsService(comments));
    }

    @DeleteMapping("/comments")
    public ResponseEntity<String> deleteComments(@RequestBody Comments comments){
        return ResponseEntity.ok(commentsService.deleteCommentsService(comments));
    }

    // search functionality
    @GetMapping("/search")
    public ResponseEntity<List<Comments>> searchComments(
            @RequestParam String keyword,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
            System.out.println("Session ID: " + session.getId());
            System.out.println("User ID: " + userId);
        }

        List<Comments> comments = commentsService.searchComments(keyword);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
}
