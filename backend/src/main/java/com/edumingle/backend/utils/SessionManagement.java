package com.edumingle.backend.utils;

import lombok.NonNull;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionManagement {
    private final Map<String, Boolean> sessions = new ConcurrentHashMap<>();

    public boolean isConnected(@NonNull String userId) {
        return this.sessions.getOrDefault(userId, false);
    }

    public void connect() {
        this.sessions.put("User", true);
    }

    public void disconnect(@NonNull String userId) {
        this.sessions.remove(userId);
    }
}
