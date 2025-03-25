package com.edumingle.backend.repositories;

import com.edumingle.backend.models.PostLikeId;
import com.edumingle.backend.models.PostLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLikes, PostLikeId> {
    boolean existsByUserInfoIdAndPostId(Integer userInfo_id, Integer post_id);
    void deleteByUserInfoIdAndPostId(Integer userInfo_id, Integer post_id);
}
