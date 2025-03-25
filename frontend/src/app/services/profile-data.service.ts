import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';
import { PostInterface } from '../types/postInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  apiUrl: string = environment.SERVER + '/api/v1';

  constructor(private http: HttpClient) {}

  // function to get the other user's profile
  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/${userId}`);
  }

  // function to get the logged-in user's profile (own profile)
  getOwnProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  getAllPostsOnUsersProfile(userId: string | null): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(`${this.apiUrl}/profile/${userId}/posts`);
  }
}
