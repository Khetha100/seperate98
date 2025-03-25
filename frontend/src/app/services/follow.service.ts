import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  followUser(followerId: number, followedId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/follow`, { followerId, followedId });
  }

  unfollowUser(followerId: number, followedId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/unfollow/${followerId}/${followedId}`);
  }

  getFollowers(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/followers/${userId}`);
  }

  getFollowing(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/following/${userId}`);
  }
}
