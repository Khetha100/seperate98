package com.edumingle.backend.repositories;

import com.edumingle.backend.controllers.CommentsController;
import com.edumingle.backend.models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByDescription(String description);

    CommentsController save(CommentsController comment);

    @Query("SELECT c FROM Comments c WHERE " +
            "LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Comments> searchComments(@Param("keyword") String keyword);

    List<Comments> findByPostId(int id);
}
