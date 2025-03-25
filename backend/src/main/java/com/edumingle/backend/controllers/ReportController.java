package com.edumingle.backend.controllers;

import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.Reports;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.PostRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.impl.ReportServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final ReportServiceImpl reportService;
    private final UserInfoRepository userInfoRepository;
    private final PostRepository postRepository;

    @Autowired
    public ReportController(ReportServiceImpl reportService, UserInfoRepository userInfoRepository,
                            PostRepository postRepository) {
        this.reportService = reportService;
        this.userInfoRepository = userInfoRepository;
        this.postRepository = postRepository;
    }

//    @PostMapping
//    public ResponseEntity<Reports> createReport(
//        @RequestBody Reports report,
//        HttpServletRequest request
//    ) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            UserInfo userId = (UserInfo) session.getAttribute("user");
//
//        }
//
//        Reports savedReport = reportService.createReport(report);
//        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
//    }

    @PostMapping("/{userId}/{postId}")
    public ResponseEntity<Reports> createReport(
            @RequestBody Reports report,
            @PathVariable Long userId,
            @PathVariable Integer postId
    ) {
        UserInfo userOptional = userInfoRepository.findById(userId);
        Post post = postRepository.findById(postId).orElse(null);
        System.out.println("POST IS");
        System.out.println(post);
//        if (userOptional != null) {
//            report.setUser(userOptional);
//            report.setPost(post);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }

        Reports savedReport = reportService.createReport(report);
        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
    }
}