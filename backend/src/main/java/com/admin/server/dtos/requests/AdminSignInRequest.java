package com.admin.server.dtos.requests;

import lombok.Data;

@Data
public class AdminSignInRequest {
    private String email;
    private String password;

}
