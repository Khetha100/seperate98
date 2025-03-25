package com.admin.server.dtos;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class UserDeleteDTO {
    private HttpStatus status;
    private String message;
}
