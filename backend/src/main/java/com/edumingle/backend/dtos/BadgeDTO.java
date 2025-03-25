package com.edumingle.backend.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BadgeDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private LocalDateTime dateGranted;
}

