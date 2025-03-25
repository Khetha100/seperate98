package com.edumingle.backend.controllers;

import com.edumingle.backend.dtos.UserDTO;
import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.PostServiceImpl;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.impl.UserInfoServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.SequencedCollection;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("api/v1/profile")
public class ProfileController {
    private final UserInfoServiceImpl userInfoService;
    private final PostServiceImpl postService;

    public ProfileController(UserInfoServiceImpl userInfoService, PostServiceImpl postService) {
        this.userInfoService = userInfoService;
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<SequencedCollection<UserInfo>> getAllProfiles(
            HttpServletRequest request
    ) throws NoSuchAlgorithmException {
        SequencedCollection<UserInfo> users = userInfoService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserInfo> updateProfile(
            @PathVariable int id,
            @RequestBody UserInfo userInfo,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException {
//        System.out.println(userInfo);
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
        }

        UserInfo updatedProfile = userInfoService.updateUserProfile(id, userInfo);
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return updatedProfile != null ? ResponseEntity.ok(updatedProfile) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserProfileById(
            @PathVariable int userId,
            HttpServletResponse response
    ) {
        UserInfo userInfo = userInfoService.getUserProfileById(userId);

        UserDTO userDTO = new UserDTO(userInfo);

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<List<Post>> getUserPosts(
            @PathVariable Integer userId
    ) {
        return ResponseEntity.ok(postService.getAllPostsByUserId(userId));
    }
    
    //endpoint for uploading a picture
    @PostMapping("{id}/upload-profile")
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        try {
            String base64Image = request.get("imageUrl");

            if (base64Image == null || base64Image.isEmpty()) {
                return ResponseEntity.badRequest().body("Image data is missing");
            }
            boolean success = userInfoService.updateUserProfilePicture(id, base64Image);

            return ResponseEntity.ok("Profile picture uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving image.");
        }
    }

}
