package com.edumingle.backend.models;

import java.io.Serializable;
import java.util.Objects;

public class PostLikeId implements Serializable {
    private Long userInfo;
    private Long post;

    public PostLikeId() {}

    public PostLikeId(Long userInfo, Long post) {
        this.userInfo = userInfo;
        this.post = post;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PostLikeId that = (PostLikeId) o;
        return Objects.equals(userInfo, that.userInfo) &&
                Objects.equals(post, that.post);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userInfo, post);
    }
}

