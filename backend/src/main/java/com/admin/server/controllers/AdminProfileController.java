package com.admin.server.controllers;

import com.admin.server.models.AdminUser;
import com.admin.server.services.impl.AdminUserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("api/v1/adminProfiles")
public class AdminProfileController {
    private final AdminUserServiceImpl adminUserService;

    public AdminProfileController(AdminUserServiceImpl adminUserService) {
        this.adminUserService = adminUserService;
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminUser> updateAdminProfile(
            @PathVariable int id,
            @RequestBody AdminUser adminUser,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws NoSuchAlgorithmException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            AdminUser sessionAdmin = (AdminUser) session.getAttribute("adminUser");
            System.out.println("Session ID: " + session.getId());
            System.out.println("Admin ID: " + (sessionAdmin != null ? sessionAdmin.getId() : "null"));

            // Check if the user is authorized to update this profile
            if (sessionAdmin == null || !sessionAdmin.getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Forbidden
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Unauthorized
        }

        // Get the existing admin user
        AdminUser existingAdmin = adminUserService.getAdminProfileById(id);
        if (existingAdmin == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the profile fields
        if (adminUser.getFirstName() != null && !adminUser.getFirstName().isEmpty()) {
            existingAdmin.setFirstName(adminUser.getFirstName());
        }

        if (adminUser.getLastName() != null && !adminUser.getLastName().isEmpty()) {
            existingAdmin.setLastName(adminUser.getLastName());
        }

        if (adminUser.getEmail() != null && !adminUser.getEmail().isEmpty()) {
            existingAdmin.setEmail(adminUser.getEmail());
        }

        // Save the updated profile
        AdminUser savedAdmin = adminUserService.updateAdminProfile(existingAdmin);

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return savedAdmin != null ? ResponseEntity.ok(savedAdmin) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{adminId}")
    public ResponseEntity<AdminUser> getAdminProfileById(
            @PathVariable int adminId,
            HttpServletResponse response
    ) {
        AdminUser adminUser = adminUserService.getAdminProfileById(adminId);
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return adminUser != null ? ResponseEntity.ok(adminUser): ResponseEntity.notFound().build();
    }
}

