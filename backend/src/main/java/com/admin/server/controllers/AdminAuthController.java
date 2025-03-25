package com.admin.server.controllers;

import com.admin.server.dtos.AdminLoginDTO;
import com.admin.server.dtos.AdminRegistrationDTO;
import com.admin.server.dtos.AdminSignInResponseDTO;
import com.admin.server.models.AdminUser;
import com.admin.server.repositories.AdminUserRepository;
import com.admin.server.services.impl.AdminUserServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("api/v1/adminAuth")
public class AdminAuthController {

    private final AdminUserServiceImpl adminUserService;
    private final AdminUserRepository adminUserRepository;

    @Autowired
    public AdminAuthController(
            AdminUserServiceImpl adminUserService,
            AdminUserRepository adminUserRepository) {
        this.adminUserService = adminUserService;
        this.adminUserRepository = adminUserRepository;
    }

    @PostMapping("/adminSignUp")
    public ResponseEntity<AdminRegistrationDTO> createUserController(
            @RequestBody AdminRegistrationDTO dto,
            HttpServletRequest request
    ) throws NoSuchAlgorithmException, IOException, InvalidKeySpecException {
        // Convert DTO to Entity
        System.out.println("ABOUT TO PRINT DTO");
        System.out.println(dto);

        // Check if user already exists
        if (adminUserRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(null); // User already exists
        }

        AdminUser adminUser = new AdminUser();
        adminUser.setFirstName(dto.getFirstName());
        adminUser.setLastName(dto.getLastName());
        adminUser.setEmail(dto.getEmail());
        adminUser.setPassword(dto.getPassword());

        // Save user
        AdminUser savedUser = adminUserService.createUser(adminUser);

        // Set session attribute
        HttpSession newSession = request.getSession(true);
        newSession.setAttribute("ADMIN_ID", savedUser.getId());
        newSession.setAttribute("adminUser", savedUser);

        // Map back to DTO
        AdminRegistrationDTO responseDTO = new AdminRegistrationDTO();
        responseDTO.setFirstName(savedUser.getFirstName());
        responseDTO.setLastName(savedUser.getLastName());
        responseDTO.setEmail(savedUser.getEmail());

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/adminSignIn")
    public ResponseEntity<AdminSignInResponseDTO> getUserByEmail(
            @RequestBody AdminLoginDTO adminLogin,
            HttpServletRequest request
    ) throws NoSuchAlgorithmException, InvalidKeySpecException {
        System.out.println("Login attempt with: " + adminLogin);

        // Call the service with the login credentials
        AdminSignInResponseDTO response = adminUserService.loadUserByUsername(
                adminLogin.getEmail(),
                adminLogin.getPassword()
        );

        System.out.println("Login response: " + response);

        if (response.getAdminUser() == null) {
            System.out.println("INSIDE NULL SINCE WHAT RETURNED FROM DATABASE IS NULL");
            return ResponseEntity.ok(new AdminSignInResponseDTO("failure", null));
        }

        HttpSession session = request.getSession();
        session.setAttribute("ADMIN_ID", response.getAdminUser().getId());
        session.setAttribute("adminUser", response.getAdminUser());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/adminSignOut")
    public ResponseEntity<String> logout(
            HttpServletResponse response,
            HttpSession session
    ) {
        session.invalidate();

        // Remove JSESSIONID cookie manually
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok("You are logged out");
    }

    @GetMapping("/current-admin")
    public ResponseEntity<AdminUser> getCurrentUser(
            HttpSession session
    ) {
        AdminUser adminUser = (AdminUser) session.getAttribute("adminUser");
        if (adminUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(adminUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminUser> findUserById(@PathVariable int id){
        return ResponseEntity.ok(adminUserRepository.findById(id).orElse(null));
    }
}

