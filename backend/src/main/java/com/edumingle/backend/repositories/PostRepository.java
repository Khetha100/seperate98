package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Post;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByDescription(String description);

    @Query("SELECT p FROM Post p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Post> searchPosts(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM post ORDER BY RANDOM() LIMIT 10", nativeQuery = true)
    List<Post> getAllPostsRandomly();

    void deleteById(@NonNull Integer id);

    List<Post> findByUserInfoId(Integer userId);


    //  List<Post> findByCategory(String category);
    void deleteById(@NonNull Long id);


}
