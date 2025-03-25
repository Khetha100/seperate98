package com.edumingle.backend.controllers;

import com.edumingle.backend.models.Post;
import com.edumingle.backend.services.impl.PostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("api/v1/home")
public class HomeController {
    private final PostServiceImpl postService;

    @Autowired
    public HomeController(PostServiceImpl postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getHomePagePosts() {
        return postService.getAllRandomPosts();
    }

}
