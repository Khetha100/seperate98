package com.edumingle.backend.repositories;

import com.edumingle.backend.models.CommunityMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<CommunityMessage, Integer> {
    List<CommunityMessage> findAByDiscussionId(int communityId);
    void deleteByDiscussionId(int id);
    void deleteBySenderId(int id);

}
