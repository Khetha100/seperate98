package com.edumingle.backend.dtos;

import com.edumingle.backend.models.ReportReason;
import com.edumingle.backend.models.UserInfo;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ReportResponseDto {
    private Long id;
    private ReportReason reason;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;
    private UserInfo user_id;
}
