package com.edumingle.backend.services;

import com.edumingle.backend.models.Notifications;
import com.edumingle.backend.models.UserInfo;

import java.util.List;

public interface NotificationService {
    List<Notifications> getUnreadNotifications(Integer userId);

    void markAsRead(Long id);

    void createNotification(UserInfo user, String message);
}
