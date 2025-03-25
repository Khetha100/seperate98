import { Injectable } from '@angular/core';
import { CommentsInterface } from '../types/comments.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PostInterface } from '../types/postInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private comment: string[] = [];
  commentsArray: CommentsInterface[] = [];

  clickedCommentPost: PostInterface = {
    imageUrl: '',
    name: '',
    description: '',
    date: new Date(),
    userInfoId: 0
  }

  apiUrl: string = environment.SERVER;

  constructor(private http: HttpClient) { }

  getComments(id:number): Observable<CommentsInterface[]> {
    return this.http.get<CommentsInterface[]>(this.apiUrl + '/api/v1/comments/'+id);
  }

  addComments(CommentsInterface: CommentsInterface): Observable<CommentsInterface> {
    console.log(CommentsInterface)
    return this.http.post<CommentsInterface>(this.apiUrl + '/api/v1/comments', CommentsInterface);
  }
  clearComments(): void {
    this.comment = [];
  }

  putLikes(commentsInterface: CommentsInterface): Observable<CommentsInterface[]> {
    return this.http.put<CommentsInterface[]>(this.apiUrl + '/comments', commentsInterface);
  }

  setClickedCommentPost(post: PostInterface) {
    this.clickedCommentPost = post;
  }
}
