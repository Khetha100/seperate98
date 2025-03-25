package com.edumingle.backend.services.impl;

import com.edumingle.backend.models.Reports;
import com.edumingle.backend.repositories.ReportRepository;
import com.edumingle.backend.models.ReportStatus;
import com.edumingle.backend.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Autowired
    public ReportServiceImpl(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Override
    public Reports createReport(Reports report) {
        report.setCreatedAt(LocalDateTime.now());
        report.setStatus(ReportStatus.PENDING);
        reportRepository.save(report);
        return report;
    }

    @Override
    public List<Reports> getAllReports() {
        return reportRepository.findAll();
    }


    // @Override
    // public void saveReport(Reports report) {
        
    // }
}

