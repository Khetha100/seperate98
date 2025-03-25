package com.edumingle.backend.services;

import com.edumingle.backend.models.Reports;



import com.edumingle.backend.models.Reports;

import java.util.List;

public interface ReportService {
    Reports createReport(Reports report);  // Method to prepare a report
    // void saveReport(Reports report);  // Method to save the report to the database

    List<Reports> getAllReports();
}

//public interface ReportService {
//
//    @Override
//    Reports createReport(Reports report);
//
//    void saveReport(Reports report);
//}
