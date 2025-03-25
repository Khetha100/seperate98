package com.edumingle.backend.controllers;

import com.edumingle.backend.models.BadgeTypes;
import com.edumingle.backend.services.BadgeTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/badge-types")
public class BadgeTypesController {

    @Autowired
    private BadgeTypesService badgeTypesService;

    @GetMapping
    public List<BadgeTypes> getAllBadgeTypes() {
        return badgeTypesService.getAllBadgeTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BadgeTypes> getBadgeTypeById(@PathVariable int id) {
        Optional<BadgeTypes> badgeType = badgeTypesService.getBadgeTypeById(id);
        return badgeType.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BadgeTypes> createBadgeType(@RequestBody BadgeTypes badgeType) {
        return ResponseEntity.ok(badgeTypesService.createBadgeType(badgeType));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBadgeType(@PathVariable int id) {
        badgeTypesService.deleteBadgeType(id);
        return ResponseEntity.noContent().build();
    }
}
