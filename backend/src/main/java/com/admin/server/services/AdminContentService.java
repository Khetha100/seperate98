package com.admin.server.services;

import com.admin.server.repositories.AdminContentRepository;
import com.edumingle.backend.dtos.ReportResponseDto;
import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.Reports;
import com.edumingle.backend.repositories.ReportRepository;
import com.edumingle.backend.services.impl.ReportServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminContentService {

    @Autowired
    private AdminContentRepository adminContentRepository;

    @Autowired
    private ReportRepository reportRepository;

    public List<Reports> getReportedContent() {
        List<Reports> reports = reportRepository.findAll();
        return reports;
    }

    public long getReportedContentCount() {
        return adminContentRepository.findAll().size();
    }

    public void deleteReport(Reports report) {
        reportRepository.delete(report);
    }

    ReportResponseDto EntityToDto(Reports reports) {
        ReportResponseDto reportResponseDto = new ReportResponseDto();
        reportResponseDto.setId(reports.getId());
        reportResponseDto.setDescription(reports.getDescription());
        reportResponseDto.setReviewedAt(reports.getReviewedAt());
        reportResponseDto.setReason(reports.getReason());
        reportResponseDto.setCreatedAt(reports.getCreatedAt());
        return reportResponseDto;
    }
}
