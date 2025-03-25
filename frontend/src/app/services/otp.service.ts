import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Otp } from '../types/Otp.interface';
import { passwordReset } from '../types/passwordReset.interface';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  phone: string = '';

  verifyNumber(otp: Otp): Observable<passwordReset> {
    return this.http.post<passwordReset>(
      'http://localhost:8080/api/otp/number-verify',
      otp
    );
  }

  resetPassword(otp: Otp): Observable<passwordReset> {
    return this.http.post<passwordReset>(
      'http://localhost:8080/api/otp/forgot-password',
      otp
    );
  }
}
