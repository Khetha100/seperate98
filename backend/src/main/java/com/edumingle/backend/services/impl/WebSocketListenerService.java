package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.CommunityMessage;
import com.edumingle.backend.repositories.MessageRepository;
import com.edumingle.backend.utils.SessionManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@Service
public class WebSocketListenerService implements ApplicationListener<SessionConnectedEvent> {

    private final SessionManagement sessionManagement;

    private final MessageRepository helloMessageRepository;

    @Autowired
    public WebSocketListenerService(SessionManagement sessionManagement, MessageRepository messageRepository) {
        this.sessionManagement = sessionManagement;
        this.helloMessageRepository = messageRepository;

    }

    @Override
    public void onApplicationEvent(SessionConnectedEvent event) {
        List<CommunityMessage> messageList = helloMessageRepository.findAll();
        for(CommunityMessage messages: messageList){
            try {
                getAllPreviousMessages(messages);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        this.sessionManagement.connect();
    }

    @SendTo("/topic/greetings")
    public CommunityMessage getAllPreviousMessages(CommunityMessage message) throws Exception {
//        return new CommunityMessage(HtmlUtils.htmlEscape(message.getContent()));
        return new CommunityMessage(HtmlUtils.htmlEscape(message.getContent()));
    }
}
