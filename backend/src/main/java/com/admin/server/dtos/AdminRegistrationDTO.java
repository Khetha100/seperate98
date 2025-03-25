package com.admin.server.dtos;

import lombok.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegistrationDTO  {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}