import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  [x: string]: any;
  apiUrl: string = 'http://localhost:8080/secret';

  constructor(private http: HttpClient) { }

  getClientSecret() {
    return this.http.get(this.apiUrl).subscribe(
      (response => console.log(response))
    )
  }
}
