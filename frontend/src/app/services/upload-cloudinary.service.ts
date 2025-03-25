import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UploadCloudinaryService {
  constructor(private http: HttpClient) {}

  // cloudinaryUrl: string = environment.cloudinaryUrl;
  // //upload signature
  // uploadSignature(vals): Observable<any> {
  //   let data = vals;
  //   return this.http.post(
  //     this.cloudinaryUrl,
  //     data
  //   );
  // }
}
