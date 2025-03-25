package com.edumingle.backend.services;

public interface PostLikeService {
    boolean likePost(Integer userId, Integer postId);
    boolean unlikePost(Integer userId, Integer postId);
}
