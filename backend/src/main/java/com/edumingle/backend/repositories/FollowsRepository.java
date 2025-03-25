package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Follows;
import com.edumingle.backend.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowsRepository extends JpaRepository<Follows, Integer> {
    // Check if a user is following another user
    boolean existsByFollower_IdAndFollowed_Id(Integer followerId, Integer followedId);

    // This method will fetch the actual Follows object
    Follows findByFollower_IdAndFollowed_Id(Integer followerId, Integer followedId);

    // Get all followers of a user
    List<UserInfo> findByFollowed_Id(Integer userId);

    // Get all users a specific user is following
    List<UserInfo> findByFollower_Id(Integer userId);
}
