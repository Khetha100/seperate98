package com.edumingle.backend.repositories;

import com.edumingle.backend.models.Notifications;
import com.edumingle.backend.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notifications, Long> {
    List<Notifications> findByUserAndReadStatusFalse(UserInfo user);
}
