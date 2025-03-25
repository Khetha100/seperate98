package com.edumingle.backend.dtos;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DeleteCommunityDTO {

    HttpStatus status;

    String message;


}