package com.edumingle.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;

public enum Roles {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    STUDENT,
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    TEACHER,
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    ADMIN
}
