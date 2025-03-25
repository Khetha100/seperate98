package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Comments;
import com.edumingle.backend.repositories.CommentsRepository;
import com.edumingle.backend.services.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsServiceImpl implements CommentsService {
    private final CommentsRepository commentsRepository;

    @Autowired
    public CommentsServiceImpl(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    @Override
    public List<Comments> getCommentsService(int postId) {
//        return commentsRepository.findAll();
        return commentsRepository.findByPostId(postId);
    }

    @Override
    public Comments addCommentsService(Comments comment) {
        return commentsRepository.save(comment);
    }

    @Override
    public String deleteCommentsService(Comments comment) {
        commentsRepository.delete(comment);
        return "comment deleted";
    }

    @Override
    public List<Comments> searchComments(String keyword) {
        return commentsRepository.searchComments(keyword);
    }
}
