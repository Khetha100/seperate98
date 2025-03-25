package com.edumingle.backend.controllers;

import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.SubjectServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.edumingle.backend.models.Subjects;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("/api/v1/subjects")
public class SubjectController {
    private final SubjectServiceImpl subjectService;

    @Autowired
    public SubjectController(SubjectServiceImpl subjectService) {
        this.subjectService = subjectService;
    }

    //    Returns a list of subjects based on the grade ID.
    @GetMapping("/{gradeId}")
    public ResponseEntity<List<Subjects>> getSubjectByGrade(
            @PathVariable int gradeId,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
            System.out.println("Session ID: " + session.getId());
            System.out.println("User ID: " + userId);
        }

//        return subjectService.getSubjectByGrade(gradeId);
        return ResponseEntity.ok(subjectService.getSubjectByGrade(gradeId));

    }
}
