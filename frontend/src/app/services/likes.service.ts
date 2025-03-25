import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostInterface } from '../types/postInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  posts!: PostInterface;

  public apiUrl = environment.SERVER + '/api/v1/posts'

  constructor(private http: HttpClient) { }

  likePost(postId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${postId}/likes?userId=${userId}`, {});
  }

  unlikePost(postId: number, userId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${postId}/likes?userId=${userId}`);
  }
}
