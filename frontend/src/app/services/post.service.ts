import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostInterface } from '../types/postInterface.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // private posts: string[] = [
  //   // 'Education is the key to unlocking potential—whether in the classroom or the pool. 🌊📚 #LifelongLearning #MakingWaves',
  // ];

  postArray: PostInterface[] = [];
  posts: PostInterface[] = [];

  postIdToDelete: number = 0;
  loggedUserId: number = 0;

  reportPostId: number = 0;

  apiUrl: string = environment.SERVER;

  constructor(private http: HttpClient, private authService: AuthService) { }


  //get any user's
  getUserPosts(userId: string): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(this.apiUrl + 'api/v1/profile/${userId}/posts')
  }

  getPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(this.apiUrl + '/api/v1/posts');
  }

  addPost(postInterface: PostInterface): Observable<PostInterface> {
    return this.http.post<PostInterface>(
      this.apiUrl + '/api/v1/posts',
      postInterface
    );
  }

  // getDate(): Observable<Date> {}

  clearPosts(): void {
    this.posts = [];
  }

  postLikes(postInterface: PostInterface): Observable<PostInterface[]> {
    return this.http.put<PostInterface[]>(
      this.apiUrl + '/api/v1/posts',
      postInterface
    );
  }

  deleteReportedPost(id: number) {
    return this.http.delete<void>('http://localhost:8080/api/v1/posts/' + id);
  }

  setClickedUserId(id: number) {
    this.authService.clickedUserId = id;
  }

  setPostIdToDelete(id?: number) {
    if (id) {
      this.postIdToDelete = id;
    }
  }

  getReoprtedPostId(postId?: number) {
    if (postId) {
      this.reportPostId = postId;
    }
  }

}