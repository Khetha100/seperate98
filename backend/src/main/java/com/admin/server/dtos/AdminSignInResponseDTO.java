package com.admin.server.dtos;

import com.admin.server.models.AdminUser;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class AdminSignInResponseDTO {
    private String status;
    private AdminUser adminUser;
    private String password;
    private String email;

    public AdminSignInResponseDTO(String status, AdminUser adminUser) {
        this.status = status;
        this.adminUser = adminUser;
    }

    public AdminSignInResponseDTO(String status, AdminUser adminUser, String email, String password) {
        this.status = status;
        this.adminUser = adminUser;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "AdminSignInResponseDTO{" +
                "status='" + status + '\'' +
                ", adminUser=" + adminUser +
                ", email='" + email + '\'' +
                '}';
    }
}

