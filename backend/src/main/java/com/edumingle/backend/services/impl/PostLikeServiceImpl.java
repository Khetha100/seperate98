package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.PostLikes;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.PostLikeRepository;
import com.edumingle.backend.services.PostLikeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PostLikeServiceImpl implements PostLikeService {
    private final PostLikeRepository postLikeRepository;

    @Autowired
    public PostLikeServiceImpl(PostLikeRepository postLikeRepository) {
        this.postLikeRepository = postLikeRepository;
    }

    @Override
    public boolean likePost(Integer userId, Integer postId) {
        if (!postLikeRepository.existsByUserInfoIdAndPostId(userId, postId)) {
            postLikeRepository.save(new PostLikes(new UserInfo(userId), new Post(postId)));
            return true;
        }
        return false;
    }

    @Override
    public boolean unlikePost(Integer userId, Integer postId) {
        if (!postLikeRepository.existsByUserInfoIdAndPostId(userId, postId)) {
            postLikeRepository.deleteByUserInfoIdAndPostId(userId, postId);
            return true;
        }
        return false;
    }
}
