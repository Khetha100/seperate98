package com.admin.server.dtos;

import lombok.*;


@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AdminLoginDTO {
    private String email;
    private String password;

}
