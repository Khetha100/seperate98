package com.edumingle.backend.services;

import com.edumingle.backend.dtos.PostDTO;
import com.edumingle.backend.models.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
    List<Post> getPostService();

    List<Post> getAllPostsByUserId(Integer userId);

    Post addPostService(PostDTO post);

    List<Post> getAllRandomPosts();

    void deletePostService(Long post);

    List<Post> searchPosts(String keyword);

    Post getSinglePostService(int postId);

    List<Post> getAllPostsById(Long userId);

}
