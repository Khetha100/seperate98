package com.admin.server.dtos.requests;

import com.edumingle.backend.models.Roles;
import lombok.Data;

@Data
public class AdminSignUpRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
