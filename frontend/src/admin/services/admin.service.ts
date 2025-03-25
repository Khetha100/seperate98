import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ReportData } from '../../app/types/reportData.interface';
import { Donations } from '../types/donation.interface';
import { PostInterface } from '../../app/types/postInterface.interface';
import { Dashboard } from '../types/dashboard.interface';
import { SubjectSelection } from '../../app/types/grade-selection.interface';
import { User } from '../../app/types/user.interface';




interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInResponse {
  status: string;
  adminUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface SignUpResponse {
  status: string;
  adminUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  dashboardData: Dashboard = {
    reportedContent: 0,
    totalCommunities: [],
    totalDonations: [],
    totalUsers: [],
  };

  private apiUrl = environment.SERVER + '/api/v1/adminAuth';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/summary`);
  }

  getReportedPost(postId: number): Observable<PostInterface> {
    console.log(postId)
    return this.http.get<PostInterface>(
      'http://localhost:8000/api/v1/posts/' + postId
    );
  }

  // temporarilyDeleteUser(userId: number): Observable<string> {
  //   return this.http.put<string>(
  //     `${this.apiUrl}/${userId}/temporarily-delete`,
  //     {}
  //   );
  // }

  // // Dashboard
  // getDashboardData(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/dashboard/summary`);
  // }

  // Content Moderation
  getReportedContent(): Observable<ReportData[]> {
    return this.http.get<ReportData[]>(
      'http://localhost:8000/api/admin/content/reported'
    );
  }

  getReportedContentCount(): Observable<ReportData[]> {
    return this.http.get<ReportData[]>(
      'http://localhost:8000/api/admin/content/reported/count'
    );
  }

  deleteContent(id: number): Observable<void> {
    return this.http.delete<void>(
      'http://localhost:8000/api/admin/content/report/delete'
    );
  }

  deleteReportedPost(id: number) {
    return this.http.delete<void>('http://localhost:8000/api/v1/posts/' + id);
  }

  // User Management
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  temporarilyDeleteUser(id: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/users/${id}/temporarily-delete`,
      {}
    );
  }

  permanentlyDeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  // Analytics
  getAnalyticsData(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/v1/admin/analytics/userRoles`);
  }

  getNewUsersCount(startDate: string): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/analytics/new-users?startDate=${startDate}`
    );
  }

  // Donations
  getDonations(): Observable<Donations[]> {
    return this.http.get<Donations[]>(
      'http://localhost:8000/api/admin/donations'
    );
  }

  getDonationSummary(): Observable<Donations[]> {
    return this.http.get<Donations[]>(`${this.apiUrl}/donations/summary`);
  }

  getTotalDonations(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/donations/total`);
  }

  getUniqueDonorsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/donations/unique-donors`);
  }

  signIn(credentials: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(
      `${this.apiUrl}/adminSignIn`,
      credentials
    );
  }

  signUp(userData: SignUpRequest): Observable<any> {
    console.log('Inside signupService');
    return this.http.post(`${this.apiUrl}/adminSignUp`, userData);
  }

  signOut(): Observable<any> {
    return this.http.get(`${this.apiUrl}/adminSignOut`);
  }

  getCurrentAdmin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-admin`);
  }

  sumTotalDonations(): number {
    let sumDonation = 0;
    this.dashboardData.totalDonations.forEach((element) => {
      sumDonation += element.amount;
    });
    return sumDonation;
  }

  calculateTopDonor() {
    let maxSofar = 0;
    let fullName = '';
    this.dashboardData.totalDonations.forEach((element) => {
      if (element.amount > maxSofar) {
        maxSofar = element.amount;
        fullName = element.fullName;
      }
    });
    return { fullName, maxSofar };
  }

  getTotalDonors() {
    return this.dashboardData.totalDonations.length;
  }

  getCommunityNumber() {
    return this.dashboardData.totalCommunities.length;
  }

  getTotalUsers() {
    return this.dashboardData.totalCommunities.length;
  }

  getDashboardDataForComponents() {
    this.getDashboardData().subscribe(
      (data) => {
        console.log(data);
        this.dashboardData = data;
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
      }
    );
  }

 calculateMostActiveSubjects(users: User[]): { subject: string; studentCount: number }[] {
  const subjectActivityCount: Record<string, number> = {};

  users.forEach(function (user) {
    user.subjects?.forEach(function (subject: SubjectSelection) {
      subjectActivityCount[subject.name] = (subjectActivityCount[subject.name] || 0) + 1;
    });
  });

  const sortedSubjects = Object.entries(subjectActivityCount)
    .map(function ([subject, count]) {
      return { subject, studentCount: count };
    })
    .sort(function (a, b) {
      return b.studentCount - a.studentCount;
    });

  return sortedSubjects;
}
}
