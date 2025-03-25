package com.edumingle.backend.controllers;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SequencedCollection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edumingle.backend.dtos.SearchDTO;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.PostRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.impl.UserInfoServiceImpl;

@CrossOrigin
@RestController
public class SearchController {

    @Autowired
    UserInfoRepository userInfoRepository;
    @Autowired
    UserInfoServiceImpl userService;
    @Autowired
    PostRepository postRepository;


    @PostMapping("/search/users")
    public ResponseEntity<List<UserInfo>> searchUser(@RequestBody SearchDTO searchDTO){
        return  ResponseEntity.ok(userInfoRepository.findByFirstNameOrLastNameLikeIgnoreCase(searchDTO.getUser(), searchDTO.getUser()));
    }

    @GetMapping("/search/people")
        public ResponseEntity<SequencedCollection<UserInfo>> getAllUsers() throws NoSuchAlgorithmException{
    // List users = (List) userService.getAllUsers();
    return ResponseEntity.ok(this.userService.getAllUsers());
    }

    @PostMapping("/search/post")
    public ResponseEntity<Map<String, Object>> searchPost(@RequestBody SearchDTO searchDTO){
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("posts", postRepository.findByDescription(searchDTO.getUser()));
        map.put("users", userInfoRepository.findByFirstNameOrLastNameLikeIgnoreCase(searchDTO.getUser(), searchDTO.getUser()));
        return ResponseEntity.ok(map);
    }
}

