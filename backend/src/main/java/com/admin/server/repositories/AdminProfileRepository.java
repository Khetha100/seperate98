package com.admin.server.repositories;

import com.admin.server.models.AdminUser;
import com.edumingle.backend.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminProfileRepository extends JpaRepository<AdminUser, Integer> {
    // Fixed return type to match the entity type
    Optional<AdminUser> findById(int adminUserId);

    // Added method to find UserInfo by ID if needed
    @org.springframework.data.jpa.repository.Query("SELECT u FROM UserInfo u WHERE u.id = :id")
    Optional<UserInfo> findUserInfoById(@org.springframework.data.repository.query.Param("id") int id);
}

