package com.edumingle.backend.controllers;

import com.admin.server.dtos.DeleteDTO;
import com.edumingle.backend.dtos.PostDTO;
import com.edumingle.backend.dtos.SearchDTO;
import com.edumingle.backend.models.UserInfo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import com.edumingle.backend.models.Post;
import com.edumingle.backend.services.impl.PostServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}, allowCredentials = "true")
@RequestMapping("/api/v1/posts")
public class PostController {
    private final PostServiceImpl postService;

    @Autowired
    public PostController(PostServiceImpl postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
//        if (session != null) {
//            UserInfo userId = (UserInfo) session.getAttribute("user");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
//        }

        return ResponseEntity.ok(postService.getPostService());
    }

    @PostMapping
    public ResponseEntity<Post> addPost(
            @RequestBody PostDTO post,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
        }

        return ResponseEntity.ok(postService.addPostService(post));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<DeleteDTO> deletePost(
            @PathVariable Long postId,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
        }

        postService.deletePostService(postId);
        return ResponseEntity.ok(new DeleteDTO(HttpStatus.OK, "Success"));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPost(
            @PathVariable Long postId,
            HttpServletRequest request
    ) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            UserInfo userId = (UserInfo) session.getAttribute("user");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
//        }

//        postService.getSinglePostService(Math.toIntExact(postId));
        return ResponseEntity.ok(postService.getSinglePostService(Math.toIntExact(postId)));
    }

    @PostMapping("/search")
    public ResponseEntity<List<Post>> searchPosts(
            @RequestBody SearchDTO keyword,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID").toString();
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
        }

        List<Post> posts = postService.searchPosts(keyword.getPost());
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

}