package com.admin.server.controllers;

import com.admin.server.services.AdminContentService;
import com.edumingle.backend.dtos.ReportResponseDto;
import com.edumingle.backend.models.Reports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/content")
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
public class AdminContentController {

    @Autowired
    private AdminContentService adminContentService;

    @GetMapping("/reported")
    public ResponseEntity<List<Reports>> getReportedContent() {
        return ResponseEntity.ok(adminContentService.getReportedContent());
    }

    @DeleteMapping("/report/delete")
    public ResponseEntity<Map<String, String>> deleteReport(Reports reports) {
        adminContentService.deleteReport(reports);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Report deleted");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/reported/count")
    public ResponseEntity<Long> getReportedContentCount() {
        return ResponseEntity.ok(adminContentService.getReportedContentCount());
    }
}
