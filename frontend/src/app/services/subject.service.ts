import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradeSelection, SubjectSelection } from '../types/grade-selection.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = environment.SERVER + '/api/v1';

  constructor(private http: HttpClient) { }

  getGrades(): Observable<GradeSelection[]> {
    return this.http.get<GradeSelection[]>(this.apiUrl + '/grades');
  }

  getGradeById(id: number): Observable<SubjectSelection> {
    return this.http.get<SubjectSelection>(`${this.apiUrl}/grades/${id}`);
  }

  // getSubjectByGrade(grade: number): Observable<SubjectSelection[]> {
  //   return this.http.get<SubjectSelection[]>(`${this.apiUrl}/${grade}/subjects`);
  // }

  getSubjectsByGradeId(gradeId: number): Observable<SubjectSelection[]> {
    return this.http.get<SubjectSelection[]>(`${this.apiUrl}/subjects/${gradeId}`);
  }


  getSubjects(): Observable<SubjectSelection[]> {
    return this.http.get<SubjectSelection[]>(this.apiUrl + '/subjects');
  }

  saveGradeAndSubjects(userId: number, grade: number, subjects: string[]): Observable<any> {
    const body = {
      grade: grade,
      subjects: subjects
    };
    return this.http.post(`${this.apiUrl}/users/${userId}/about-you`, body);
  }
}
