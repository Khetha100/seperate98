import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.SERVER + '/api/v1';

  getProfile(id: string) {
    return this.http.get(`${this.apiUrl}/profile/${id}`);
  }

  //thiss ervice method sends data to the backend withthe updated profile data
  updateUserProfile(userId: string, profileData: any): Observable<any> {
    if (!profileData.phone) {
      console.error('Phone number is missing from the request!');
      return throwError(() => new Error('Phone number is required'));
    }
    return this.http.put(`${this.apiUrl}/profile/${userId}`, profileData);
  }

  //this gets the edited profile from the backend
  getEdittedProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${userId}`);
  }

  uploadProfilePicture(base64Image: string) {
    return this.http.post(`${this.apiUrl}/{id}/upload-profile`, { imageUrl: base64Image });
    }
  
}
