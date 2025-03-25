package com.edumingle.backend.models;

import java.io.Serializable;
import java.util.Objects;

public class FollowsId implements Serializable {
    private Integer follower;
    private Integer followed;

    public FollowsId() {}

    public FollowsId(Integer follower, Integer followed) {
        this.follower = follower;
        this.followed = followed;
    }

    public Integer getFollower() {
        return follower;
    }

    public void setFollower(Integer follower) {
        this.follower = follower;
    }

    public Integer getFollowed() {
        return followed;
    }

    public void setFollowed(Integer followed) {
        this.followed = followed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FollowsId followsId = (FollowsId) o;
        return Objects.equals(follower, followsId.follower) &&
                Objects.equals(followed, followsId.followed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(follower, followed);
    }
}

