import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CommunityService } from './community.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityMessageService {

  apiUrl: string = environment.SERVER;

  constructor(private http: HttpClient,
    private communityService: CommunityService
  ) {
   }

  deleteMessage(clickedMessageId: number): Observable<any>{
    console.log("at delete message method");
    return this.http.delete<any>(this.apiUrl + '/community/discussions/' + this.communityService.clickedDiscussionId + '/messages/'+clickedMessageId);
  }

}
