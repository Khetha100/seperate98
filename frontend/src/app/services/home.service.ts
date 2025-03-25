import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostInterface } from '../types/postInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = environment.SERVER + '/api/v1/home';

  constructor(private http: HttpClient) {}

  getRandomPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(this.apiUrl);
  }
}
