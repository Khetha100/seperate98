package com.edumingle.backend.services;

import com.edumingle.backend.dtos.BadgeDTO;
import com.edumingle.backend.models.Badges;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.BadgeRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BadgeService {
    private final BadgeRepository badgeRepository;
    private final UserInfoRepository userInfoRepository;

    @Autowired
    public BadgeService(BadgeRepository badgeRepository, UserInfoRepository userInfoRepository) {
        this.badgeRepository = badgeRepository;
        this.userInfoRepository = userInfoRepository;
    }

    public Optional<Badges> getUserBadge(Long userId) {
        return badgeRepository.findByUserId(userId);
    }

//    @Transactional
//    public Badges awardBadge(Long userId, BadgeDTO badgeDTO) {
//        UserInfo userOptional = userInfoRepository.findById(userId);
//        if (userOptional !=null) {
//            return null; // Handle case if user is not found
//        }
//
//        UserInfo user = userOptional;
//
//        Badges badge = new Badges();
//        badge.setName(badgeDTO.getName());
//        badge.setDescription(badgeDTO.getDescription());
//        badge.setImageUrl(badgeDTO.getImageUrl());
//        badge.setUser(user);  // Set the user for the badge
//
//        // Set the date granted, this is done on persist in the Badge model, but ensure it's done
//        badge.setDateGranted(LocalDateTime.now());
//
//        return badgeRepository.save(badge);  // Save the badge to the repository
//    }
}
