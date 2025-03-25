package com.admin.server.dtos;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DeleteDTO {
    HttpStatus status;
    String message;
}
