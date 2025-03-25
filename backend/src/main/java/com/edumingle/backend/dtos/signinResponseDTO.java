package com.edumingle.backend.dtos;

import com.edumingle.backend.models.UserInfo;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class signinResponseDTO {
    private String status;
    private UserInfo userInfo;
}
