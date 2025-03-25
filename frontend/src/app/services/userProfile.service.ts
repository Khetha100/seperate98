import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

 private apiUrl = environment.SERVER + '/api';

  constructor(private http: HttpClient) { }

  //fetch current user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  //update the user profile specifically the grade and subjects
  updateUserProfile(profile: User): Observable<any> {
    const formData = new FormData();

    //this allows for values to be appeneded if they are defined
    if (profile.firstName) formData.append('firstName', profile.firstName);
    if (profile.lastName) formData.append('lastName', profile.lastName);
    if (profile.bio) formData.append('bio', profile.bio);
    if (profile.phone)formData.append('phoneNumber', profile.phone);
    if (profile.grade !== null) formData.append('grade', profile.grade.toString());
    if (profile.role) formData.append('role', profile.role);

//appends only if the user is  a teacher
    if (profile.role === 'TEACHER' && profile.saceNumber) {
      formData.append('saceNumber', profile.saceNumber);  
    }

    if (profile.imageUrl) {
      formData.append('imageUrl', profile.imageUrl);  
    }

   if (profile.subjects && profile.subjects.length > 0) {
    formData.append('subjectNames', JSON.stringify(profile.subjects));  
  }
    return this.http.put<any>(`${this.apiUrl}/profile`, formData);
  }

}
