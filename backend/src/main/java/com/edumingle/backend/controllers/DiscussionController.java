package com.edumingle.backend.controllers;

import com.edumingle.backend.dtos.DeleteDiscussionDTO;
import com.edumingle.backend.dtos.DeleteMessageDTO;
import com.edumingle.backend.models.Discussion;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.DiscussionServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.edumingle.backend.dtos.CommunityDiscussionDTO;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("/api/v1/discussions")
public class DiscussionController {
    private final DiscussionServiceImpl discussionService;

    @Autowired
    public DiscussionController(DiscussionServiceImpl discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping("/")




    public ResponseEntity<List<Discussion>> getAllCreatedDiscussions(
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");

        }

        return ResponseEntity.ok(discussionService.getAllDiscussions());
    }

    @CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
    @GetMapping("/{discussion}")
    public ResponseEntity<List<Discussion>> getAllCreatedDiscussionsOnACommunity(
            @PathVariable int discussion,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");

        }

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(discussionService.getAllDiscussionsByCommunityId(discussion));
    }

    @PostMapping("/")
    public ResponseEntity<Discussion> addADiscussionCreated(
            @RequestBody CommunityDiscussionDTO discussion,
            HttpServletRequest request
    ) {
        System.out.println("ABOUT TO ADD DISCUSSION");
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");

        }

        return ResponseEntity.ok(discussionService.addADiscussion(discussion));
    }

    // search functionality
    @GetMapping("/search")
    public ResponseEntity<List<Discussion>> searchDiscussions(
            @RequestParam String keyword,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");

        }

        List<Discussion> discussions = discussionService.searchDiscussions(keyword);
        return new ResponseEntity<>(discussions, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DeleteDiscussionDTO> deleteDiscussion(@PathVariable int id) {

        return ResponseEntity.ok(discussionService.deleteDiscussion(id));
    }

    @DeleteMapping("/community/discussions/{clickedDiscussionId}/messages/{clickedMessageId}")
    public ResponseEntity<DeleteMessageDTO> deleteMessage(@PathVariable int clickedMessageId, @PathVariable int clickedDiscussionId){
        System.out.println(clickedDiscussionId);
        System.out.println(clickedMessageId);
        return ResponseEntity.ok(discussionService.deleteDiscussionMessage(clickedMessageId));
    }
}
