import { CommunityService } from './community.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CommunityDiscussion } from './../types/communityDiscussion.interface';
import { communityMessage } from '../types/communityMessage.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunityDiscussionsService {
  constructor(
    private http: HttpClient,
    private communityService: CommunityService
  ) {}

  apiUrl: string = environment.SERVER;
  clickedDiscussion: CommunityDiscussion = {
    title: '',
    description: '',
  };

  clickedChannel: string = '';

  // getAllDiscussions(): Observable<CommunityDiscussion[]> {
  //   return this.http.get<CommunityDiscussion[]>(this.apiUrl + '/discussion');
  // }

  //I need to get discussions specific to the clicked community. which this should be a post since I need to pass communityId
  // getAllDiscussions(): Observable<CommunityDiscussion[]> {
  //   // console.log("BOUT TO SEND TO ");
  //   return this.http.get<CommunityDiscussion[]>(this.apiUrl +"/api/v1/discussions/"+ this.communityService.communityClickedId);
  // }

  getAllDiscussions(): Observable<CommunityDiscussion[]> {
    return this.http
      .get<CommunityDiscussion[]>(
        this.apiUrl +
          '/api/v1/discussions/' +
          this.communityService.communityClickedId
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching discussions:', error);
          throw error; // rethrow or handle error as needed
        })
      );
  }

  public allPrevious(): Observable<communityMessage[]> {
    return this.http.get<communityMessage[]>(
      this.apiUrl + '/hellos/' + this.clickedDiscussion.id
    );
  }

  createCommunityDiscussion(
    communityDiscussion: CommunityDiscussion
  ): Observable<CommunityDiscussion> {
    console.log("about to print discussion object");
    console.log(communityDiscussion);
    return this.http.post<CommunityDiscussion>(
      this.apiUrl + '/api/v1/discussions/',
      communityDiscussion
    );
  }

  deleteDiscussionService(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/api/v1/discussions/' + id);
  }

  setClickedDiscussionId(discussionId: CommunityDiscussion) {
    this.clickedDiscussion = discussionId;
  }

  setClickedChannel(channel: string) {
    this.clickedChannel = channel;
  }

  getDiscussionInfo(id: number): Observable<CommunityDiscussion> {
    return this.http.get<CommunityDiscussion>(
      this.apiUrl + '/api/v1/discussions/' + id
    );
  }
}
