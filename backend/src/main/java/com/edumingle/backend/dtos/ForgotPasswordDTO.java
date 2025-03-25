package com.edumingle.backend.dtos;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ForgotPasswordDTO {

    private  String phone;

    private String password;
}
