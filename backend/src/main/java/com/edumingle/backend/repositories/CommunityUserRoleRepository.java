package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Community;
import com.edumingle.backend.models.CommunityUserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityUserRoleRepository extends JpaRepository<CommunityUserRole, Integer> {
    List<CommunityUserRole> findByCommunityId(int id);

    void  deleteByCommunityId(int id);
    void deleteByUserInfoId(int id);

}
