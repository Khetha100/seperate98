package com.edumingle.backend.repositories;

import com.edumingle.backend.models.ReportStatus;
import com.edumingle.backend.models.Reports;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReportRepository extends JpaRepository<Reports, Long> {
    // You can define custom queries if needed
    void deleteByPostId(Long postId);
}

//@Repository
//public interface ReportRepository extends JpaRepository<Reports, Long> {
//    List<Reports> findByStatus(ReportStatus status);
//
//}
