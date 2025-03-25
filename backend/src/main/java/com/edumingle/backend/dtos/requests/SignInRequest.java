package com.edumingle.backend.dtos.requests;

import lombok.Data;

@Data
public class SignInRequest {
    private String phone;
    private String password;
}
