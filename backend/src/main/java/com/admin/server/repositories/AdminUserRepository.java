package com.admin.server.repositories;

import com.admin.server.models.AdminUser;
import com.edumingle.backend.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Integer> {
    // Fixed method name to match the query (was findByPhone but querying by email)
    @Query("SELECT u FROM UserInfo u WHERE u.phone = :phone")
    UserInfo findUserInfoByEmail(@Param("phone") String phone);

    @Query("Select DISTINCT c from UserInfo c where c.firstName iLIKE %:name%")
    List<AdminUser> findByFirstNameContain(String name);

    boolean existsByEmail(String email);

    List<AdminUser> findByFirstNameOrLastNameLikeIgnoreCase(String firstName, String lastName);

    AdminUser findByEmail(String email);
}

