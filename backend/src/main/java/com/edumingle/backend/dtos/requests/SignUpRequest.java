package com.edumingle.backend.dtos.requests;

import com.edumingle.backend.models.Roles;
import lombok.Data;

@Data
public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String saceNumber;
    private String password;
    private Roles role;
}
