import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { searchInterface } from '../types/search.interface';
import { User } from '../types/user.interface';
import { Community } from '../types/community.interface';
import { PostComponent } from '../components/post/post.component';
import { PostInterface } from '../types/postInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  httpOptions = {
    headers: { 'Content-Type': 'application/json' },
    params: { keyword: 'sino' },
  };

  constructor(private http: HttpClient) {}

  apiUrl: string = environment.SERVER;
  searchPerson(searchObj: searchInterface): Observable<User[]> {
    return this.http.post<User[]>(
      this.apiUrl + '/api/v1/communities/search/people',
      searchObj
    );
  }
  searchCommunity(searchObj: searchInterface): Observable<Community> {
    return this.http.post<Community>(
      this.apiUrl + '/search/community',
      searchObj
    );
  }

  searchPosts(searchObj: searchInterface): Observable<PostInterface[]> {
    // keyword = searchObj.post;
    return this.http.post<PostInterface[]>(
      this.apiUrl + '/api/v1/posts/search',
      searchObj
    );
  }
}
