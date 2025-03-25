package com.edumingle.backend.services;

import com.edumingle.backend.models.BadgeTypes;
import com.edumingle.backend.repositories.BadgeTypesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BadgeTypesService {

    @Autowired
    private BadgeTypesRepository badgeTypesRepository;

    public List<BadgeTypes> getAllBadgeTypes() {
        return badgeTypesRepository.findAll();
    }

    public Optional<BadgeTypes> getBadgeTypeById(int id) {
        return badgeTypesRepository.findById(id);
    }

    public BadgeTypes createBadgeType(BadgeTypes badgeType) {
        return badgeTypesRepository.save(badgeType);
    }

    public void deleteBadgeType(int id) {
        badgeTypesRepository.deleteById(id);
    }
}
