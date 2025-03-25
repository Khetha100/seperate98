package com.admin.server.repositories;


import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.UserInfoRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdminAnalyticsRepository extends UserInfoRepository {
    @Query("SELECT COUNT(u) FROM UserInfo u WHERE u.createdAt >= :startDate")
    long countNewUsersInPeriod(java.util.Date startDate);

    @Query("SELECT u.role, COUNT(u) FROM UserInfo u GROUP BY u.role")
    List<Object[]> getUserCountByRole();

}