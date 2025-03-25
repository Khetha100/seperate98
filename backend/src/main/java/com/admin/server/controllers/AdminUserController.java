package com.admin.server.controllers;

import com.admin.server.dtos.UserDeleteDTO;
import com.admin.server.services.AdminUserService;
import com.admin.server.services.impl.AdminUserServiceImpl;
import com.edumingle.backend.models.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/adminAuth")
@CrossOrigin(origins = "http://localhost:4000")
public class AdminUserController {

    @Autowired
    private AdminUserServiceImpl adminUserService;

    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getAllUsers() throws NoSuchAlgorithmException {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<UserDeleteDTO> permanentDelete(@PathVariable int id){
        return ResponseEntity.ok(adminUserService.permanentDelete(id));
    }

    @PostMapping("/users/{userId}/temporarily-delete")
    public ResponseEntity<Void> temporarilyDeleteUser(@PathVariable int userId) {
//        System.out.println("ABOUT TO DELETE A USER");
        adminUserService.temporarilyDeleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTotalUserCount() {
        return ResponseEntity.ok(adminUserService.getTotalUserCount());
    }

    @PutMapping("/{userId}/temporarily-delete")
    public ResponseEntity<String> temporarilyDeleteUser(@PathVariable Integer userId) {
        adminUserService.temporarilyDeleteUser(userId);
        return ResponseEntity.ok("User temporarily deleted successfully.");
    }
}