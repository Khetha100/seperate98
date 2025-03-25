package com.edumingle.backend.dtos;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CommunitySearchResponse {
    private HttpStatus status;

    private String body;

}
