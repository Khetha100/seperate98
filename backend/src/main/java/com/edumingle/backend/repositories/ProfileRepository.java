package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findById(int userId);

    @Query("SELECT p FROM Post p WHERE p.userInfo.id = :userId")
    List<Post> getAllPostsById(@Param("userId") Integer userId);
}
