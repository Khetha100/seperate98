package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Comments;
import com.edumingle.backend.models.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    @Query("Select DISTINCT c from Community c where c.name iLIKE %:name%")
    List<Community> findByNameContaining(String name);


}
