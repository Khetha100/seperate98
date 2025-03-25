package com.edumingle.backend.controllers;

import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.services.impl.GradeServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edumingle.backend.models.Grades;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("/api/v1/grades")
public class GradeController {
    private final GradeServiceImpl gradeService;

    @Autowired
    public GradeController(GradeServiceImpl gradeService) {
        this.gradeService = gradeService;
    }

    //this gets all the grades
    @GetMapping
    public List<Grades> getAllGrades(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
            System.out.println("Session ID: " + session.getId());
            System.out.println("User ID: " + userId);
        }

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        return gradeService.getAllGrades();
    }

    @GetMapping("/{id}")
    public Optional<Grades> getGradeById(
            @PathVariable Integer id,
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            UserInfo userId = (UserInfo) session.getAttribute("user");
            System.out.println("Session ID: " + session.getId());
            System.out.println("User ID: " + userId);
        }

        return gradeService.getGradeById(id);
    }
}
