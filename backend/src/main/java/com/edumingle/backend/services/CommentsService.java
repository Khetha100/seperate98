package com.edumingle.backend.services;

import com.edumingle.backend.models.Comments;
import com.edumingle.backend.repositories.CommentsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentsService {
    List<Comments> getCommentsService(int postId);

    Comments addCommentsService(Comments comment);

    String deleteCommentsService(Comments comment);

    List<Comments> searchComments(String keyword);
}
