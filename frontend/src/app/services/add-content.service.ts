import { Injectable } from '@angular/core';
import { UploadCloudinaryService } from './upload-cloudinary.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { from, map } from 'rxjs';
import Swal from 'sweetalert2';
import sha1 from 'sha1';

@Injectable({
  providedIn: 'root',
})
export class AddContentService {
  uuidValue: string | Blob = '';
  communityPicture: string = '/images/community-default.jpg';

  postPicture: string = '';
  isLoading: boolean = false;

  identification: string | undefined;
  uploadTitle: string | undefined;
  uploadStatus: boolean | undefined;

  profilePicture: string = '';

  constructor(
    private uploadService: UploadCloudinaryService,
    private http: HttpClient
  ) {}

  uploadProfilePicture(file: File) {
    const imageEnd = file.name.split('.')[file.name.split('.').length - 1];
    console.log(file.name);
    const signData = this.signuploadform();
    const formData = new FormData();
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260');
    formData.append('folder', 'identification/NGA');
    formData.append('public_id', this.uuidValue);
    formData.append('file', file);
    formData.append('api_key', signData.api_key);
    formData.append('timestamp', signData.timestamp.toString());
    formData.append('signature', signData.signature);
    console.log(this.uuidValue);
    console.log(formData);
    this.profilePicture =
      'https://res.cloudinary.com/dewxqftck/image/upload/v1739148627/identification/NGA/' +
      this.uuidValue +
      '.' +
      imageEnd;
    const url =
      'https://api.cloudinary.com/v1_1/' +
      environment.CLOUD_NAME +
      '/image/upload';
    this.isLoading = true;

    this.http
      .post(url, formData)
      .pipe(map((x: any) => x.secure_url as string))
      .subscribe({
        next: (res) => {
          this.identification = res;
          this.uploadTitle = 'ID Uploaded';
          this.uploadStatus = true;
          from(
            Swal.fire({
              icon: 'success',
              title: 'Successfully uploaded',
              showConfirmButton: true,
            })
          );
        },
        error: (error) => {
          this.isLoading = false;
          from(
            Swal.fire({
              icon: 'error',
              title: 'Please check your image and try again',
              showConfirmButton: true,
            })
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  uploadFile(file: File) {
    const imageEnd = file.name.split('.')[file.name.split('.').length - 1];
    console.log(file.name);
    const signData = this.signuploadform();
    const formData = new FormData();
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260');
    formData.append('folder', 'identification/NGA');
    formData.append('public_id', this.uuidValue);
    formData.append('file', file);
    formData.append('api_key', signData.api_key);
    formData.append('timestamp', signData.timestamp.toString());
    formData.append('signature', signData.signature);
    console.log(this.uuidValue);
    console.log(formData);
    this.communityPicture =
      'https://res.cloudinary.com/dewxqftck/image/upload/v1739148627/identification/NGA/' +
      this.uuidValue +
      '.' +
      imageEnd;
    const url =
      'https://api.cloudinary.com/v1_1/' +
      environment.CLOUD_NAME +
      '/auto/upload';
    this.isLoading = true;

    this.http
      .post(url, formData)
      .pipe(map((x: any) => x.secure_url as string))
      .subscribe({
        next: (res) => {
          this.identification = res;
          this.uploadTitle = 'ID Uploaded';
          this.uploadStatus = true;
          from(
            Swal.fire({
              icon: 'success',
              title: 'Successfully uploaded',
              showConfirmButton: true,
            })
          );
        },
        error: (error) => {
          this.isLoading = false;
          from(
            Swal.fire({
              icon: 'error',
              title: 'Please check your image and try again',
              showConfirmButton: true,
            })
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  uploadFilePost(file: File) {
    const imageEnd = file.name.split('.')[file.name.split('.').length - 1];
    console.log(file.name);
    const signData = this.signuploadform();
    const formData = new FormData();
    formData.append('eager', 'c_pad,h_300,w_400|c_crop,h_200,w_260');
    formData.append('folder', 'identification/NGA');
    formData.append('public_id', this.uuidValue);
    formData.append('file', file);
    formData.append('api_key', signData.api_key);
    formData.append('timestamp', signData.timestamp.toString());
    formData.append('signature', signData.signature);
    console.log("ABOUT TO UPLOAD");
    console.log(this.uuidValue);
    console.log(formData);
    this.postPicture =
      'https://res.cloudinary.com/dewxqftck/image/upload/v1739148627/identification/NGA/' +
      this.uuidValue +
      '.' +
      imageEnd;
    const url =
      'https://api.cloudinary.com/v1_1/' +
      environment.CLOUD_NAME +
      '/auto/upload';
    this.isLoading = true;
    

    this.http
      .post(url, formData)
      .pipe(map((x: any) => x.secure_url as string))
      .subscribe({
        next: (res) => {
          this.identification = res;
          this.uploadTitle = 'ID Uploaded';
          this.uploadStatus = true;
          from(
            Swal.fire({
              icon: 'success',
              title: 'Successfully uploaded',
              showConfirmButton: true,
            })
          );
        },
        error: (error) => {
          this.isLoading = false;
          from(
            Swal.fire({
              icon: 'error',
              title: 'Please check your image and try again',
              showConfirmButton: true,
            })
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });

  }

  signuploadform() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = environment.CLOUDINARY_API_SECRET;
    const api_key = environment.CLOUDINARY_API_KEY;
    const signature = sha1(
      'eager=c_pad,h_300,w_400|c_crop,h_200,w_260&folder=identification/NGA&public_id=' +
        this.uuidValue +
        '&timestamp=' +
        timestamp +
        apiSecret
    );
    return { timestamp, signature, api_key };
  }
}
