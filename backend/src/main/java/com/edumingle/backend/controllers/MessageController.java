package com.edumingle.backend.controllers;

import com.edumingle.backend.models.CommunityMessage;
import com.edumingle.backend.models.Discussion;
import com.edumingle.backend.repositories.DiscussionRepository;
import com.edumingle.backend.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
public class MessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final MessageRepository helloMessageRepository;

    private final DiscussionRepository discussionRepository;

    @Autowired
    public MessageController(SimpMessagingTemplate template, MessageRepository helloMessageRepository, DiscussionRepository discussionRepository) {
        this.simpMessagingTemplate = template;
        this.helloMessageRepository = helloMessageRepository;
        this.discussionRepository = discussionRepository;
    }

    @MessageMapping("/hello")
    public CommunityMessage greeting(CommunityMessage message) throws Exception {
        System.out.println("CHANNEL IS !!!!!");
        System.out.println(message.getSubscriptionChannel());
//        Discussion discussion = discussionRepository.findById(message.getDiscussionId()).orElse(null);
//        message.setDiscussion(discussion);
        this.simpMessagingTemplate.convertAndSend(message.getSubscriptionChannel(), message);
        CommunityMessage communityMessage = helloMessageRepository.save(message);
        System.out.println(communityMessage);
        return communityMessage;
    }

//    @GetMapping("/hellos/{communityId}")
//    List<CommunityMessage> getAllGreetingsForSpecificCommunity(@PathVariable int communityId) {
//        List<CommunityMessage> communityMessages = helloMessageRepository.findAByDiscussionId(communityId);
//
//        System.out.println(communityMessages);
//        return communityMessages;
//    }

    @GetMapping("/hellos/{discussionId}")
    List<CommunityMessage> getAllGreetings(@PathVariable int discussionId){
        List<CommunityMessage> communityMessages = helloMessageRepository.findAByDiscussionId(discussionId);
        System.out.println(communityMessages);
        return communityMessages;
    }
}
