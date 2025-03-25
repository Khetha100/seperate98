package com.edumingle.backend.dtos;

import com.edumingle.backend.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    private Integer id;
    private String imageUrl;
    private String name;
    private String description;
    private LocalDateTime date;
    private Integer userInfoId;
    private boolean reported;
    private Date reportedDate;
}

