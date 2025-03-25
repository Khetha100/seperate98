package com.edumingle.backend.dtos;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RequestDetailsDTO {
    private String phoneNumber;
    private String recaptchaToken;
}
