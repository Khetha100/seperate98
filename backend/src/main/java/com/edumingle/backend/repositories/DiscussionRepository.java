package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Comments;
import com.edumingle.backend.models.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Integer> {
    List<Discussion> findByCommunityId(int communityId);

    @Query("SELECT d FROM Discussion d WHERE " +
            "LOWER(d.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Discussion> searchDiscussions(@Param("keyword") String keyword);

    void deleteByCommunityId(int id);

    void deleteByUserInfoId(int id);

}
