package com.edumingle.backend.controllers;

import com.edumingle.backend.dtos.BadgeDTO;
import com.edumingle.backend.models.Badges;

import com.edumingle.backend.services.BadgeService;

import com.edumingle.backend.services.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/badges")
@CrossOrigin
public class BadgeController {
    private final BadgeService badgeService;

    @Autowired
    public BadgeController(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Badges> getUserBadge(@PathVariable Long userId) {
        return badgeService.getUserBadge(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @PostMapping("/award/{userId}")
//    public ResponseEntity<Badges> awardBadge(
//            @PathVariable Long userId,
//            @RequestBody BadgeDTO badgeDTO
//    ) {
//        Badges badge = badgeService.awardBadge(userId, badgeDTO);
//        return ResponseEntity.ok(badge);
//    }
}

