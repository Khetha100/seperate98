package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Notifications;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.NotificationRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserInfoRepository userInfoRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserInfoRepository userInfoRepository) {
        this.notificationRepository = notificationRepository;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    @Transactional
    public List<Notifications> getUnreadNotifications(Integer userId) {
        UserInfo user = userInfoRepository.findById(userId).orElseThrow();
        return notificationRepository.findByUserAndReadStatusFalse(user);
    }

    @Override
    public void markAsRead(Long id) {
        Notifications notification = notificationRepository.findById(id).orElseThrow();
        notification.setReadStatus(true);
        notificationRepository.save(notification);
    }

    @Override
    public void createNotification(UserInfo user, String message) {
        notificationRepository.save(new Notifications(user, message));
    }
}