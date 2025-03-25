package com.edumingle.backend.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SearchDTO {
    private String user;
    private String post;
    private String communityTitle;
    private String communityDescription;
}