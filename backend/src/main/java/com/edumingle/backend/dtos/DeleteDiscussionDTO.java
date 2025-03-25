package com.edumingle.backend.dtos;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class DeleteDiscussionDTO {
    HttpStatus status;

    String message;
}