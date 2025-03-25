package com.edumingle.backend.dtos;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoLoginDTO  {
    private String phone;
    private String password;
}
