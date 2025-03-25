package com.admin.server.repositories;

import com.edumingle.backend.models.Reports;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminContentRepository extends JpaRepository<Reports, Integer> {
}
