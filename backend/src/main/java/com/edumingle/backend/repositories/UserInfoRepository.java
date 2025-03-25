package com.edumingle.backend.repositories;

import com.edumingle.backend.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    @Query("SELECT u FROM UserInfo u WHERE u.phone = :phone")
    UserInfo findByPhone(@Param("phone") String phoneNumber);

    @Query("Select DISTINCT c from UserInfo c where c.firstName iLIKE %:name%")
    List<UserInfo> findByFirstNameContain(String name);

    UserInfo findById(Long userId);

    boolean existsByPhone(String phone);

    boolean existsBySaceNumber(String saceNumber);

    List<UserInfo> findByFirstNameOrLastNameLikeIgnoreCase(String firstName, String lastName);
}



    //thistells jpa to find posts where the userInfo.id matches the provided userID
//    List<Post> findByUserInfo_Id(Long userId);}


