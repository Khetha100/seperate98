package com.edumingle.backend.controllers;

import com.edumingle.backend.dtos.UserInfoLoginDTO;
import com.edumingle.backend.dtos.UserInfoRegistrationDTO;
import com.edumingle.backend.dtos.requests.SignInRequest;
import com.edumingle.backend.dtos.requests.SignUpRequest;
import com.edumingle.backend.dtos.signinResponseDTO;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.impl.UserInfoServiceImpl;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("api/v1/auth")
public class AuthController {
    private final UserInfoServiceImpl userInfoService;


    @Autowired
    public UserInfoRepository userInfoRepository;

    @Autowired
    public AuthController(UserInfoServiceImpl userInfoService) {
        this.userInfoService = userInfoService;
    }

//    @PostMapping("/signup")
//    public ResponseEntity<Map<String, String>> signUpController(
//            @RequestBody SignUpRequest signUpRequest,
//            HttpServletRequest request
//    ) throws Exception {
//        UserInfo userInfo = userInfoService.registerUser(signUpRequest);
//        HttpSession session = request.getSession();
//        session.setAttribute("user", userInfo);
//
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "user is registered successfully");
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(response);
//    }
//
//    @PostMapping("/signin")
//    public  ResponseEntity<Map<String, String>> getUserByPhoneNo(
//            @RequestBody SignInRequest signInRequest,
//            HttpServletRequest request
//    ) throws Exception {
//        UserInfo userInfo = userInfoService.authenticateUser(signInRequest);
//        HttpSession session = request.getSession();
//        session.setAttribute("user", userInfo);
//
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "user is authenticated");
//
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }

    @PostMapping("/signup")
    public ResponseEntity<UserInfo> createUserController(
            @RequestBody UserInfoRegistrationDTO dto,
            HttpServletRequest request
    ) throws NoSuchAlgorithmException, IOException, InvalidKeySpecException {
        // Convert DTO to Entity
//        System.out.println("ABOUT TO PRINT DTO");
//        System.out.println(dto);
        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName(dto.getFirstName());
        userInfo.setLastName(dto.getLastName());
        userInfo.setSaceNumber(dto.getSaceNumber() != null ? dto.getSaceNumber() : "N/A");
        userInfo.setPhone(dto.getPhone());
        userInfo.setPassword(dto.getPassword());
        userInfo.setRole(dto.getRole());


        // Hash password before saving
//        String hashedPassword = hashProvider.getHashedPassword(dto.getPassword(), hashProvider.getSalt()); // Assume you have a service for hashing


        // Save user
        UserInfo savedUser = userInfoService.createUser(userInfo);

        // Set session attribute
        HttpSession newSession = request.getSession(true);
        newSession.setAttribute("USER_ID", savedUser.getId());

        // Map back to DTO
//        UserInfoRegistrationDTO responseDTO = new UserInfoRegistrationDTO();
//        responseDTO.setFirstName(savedUser.getFirstName());
//        responseDTO.setLastName(savedUser.getLastName());
//        responseDTO.setSaceNumber(savedUser.getSaceNumber());
//        responseDTO.setPhone(savedUser.getPhone());

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/signin")
    public  ResponseEntity<signinResponseDTO> getUserByPhoneNo(
            @RequestBody UserInfoLoginDTO userLogin,
            HttpServletRequest request
    ) throws NoSuchAlgorithmException, InvalidKeySpecException {
        System.out.println(userLogin);
        signinResponseDTO userInfo = userInfoService.loadUserByUsername(userLogin);

//        System.out.println();
//        System.out.println(userInfo);

        if (userInfo.getUserInfo() == null) {
            System.out.println("INSIDE NULL SINCE  WHAT RETURNED FROM DATABASE IS NULL");
            return ResponseEntity.ok(new signinResponseDTO("failure", null));
        }

        HttpSession session = request.getSession();
        session.setAttribute("USER_ID", userInfo.getUserInfo().getId());

        UserInfoLoginDTO dto = new UserInfoLoginDTO();
        dto.setPhone(userLogin.getPhone());
        dto.setPassword(userLogin.getPassword());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/signout")
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

    @GetMapping("/current-user")
    public ResponseEntity<UserInfo> getCurrentUser(
            HttpSession session
    ) {
        UserInfo userInfo = (UserInfo) session.getAttribute("user");
        if (userInfo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserInfo> findUserById(@PathVariable int id){
        return ResponseEntity.ok(userInfoRepository.findById(id).orElse(null));
    }
}
