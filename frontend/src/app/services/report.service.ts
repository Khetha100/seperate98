import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReportData } from '../types/reportData.interface';


@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = environment.SERVER + '/api/v1';

  reportPostId: number = 0;

  constructor(private http: HttpClient) {}

  submitReport(report: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/reports`, report, {responseType: 'text'});
    return this.http.post(`${this.apiUrl}/reports/` + report.userId+"/"+report.postId, report);
  }
}
