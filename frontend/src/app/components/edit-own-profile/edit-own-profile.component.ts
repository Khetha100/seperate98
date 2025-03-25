import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsideNavComponent } from '../inside-nav/inside-nav.component';
import { Router } from '@angular/router';
import { EditProfileService } from '../../services/edit-profile.service';
import { ProfileDataService } from '../../services/profile-data.service';
import { AddContentService } from '../../services/add-content.service';

@Component({
  selector: 'app-edit-own-profile',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    InsideNavComponent,
  ],
  templateUrl: './edit-own-profile.component.html',
  styleUrl: './edit-own-profile.component.css',
})
export class EditOwnProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedImage: string | null = null;
  selectedSubjects: { id: number; name: string }[] = [];

  toastMessage: string = '';
  isToastMessageVisible = false;

  userId: string | null = '';
  loggedInUserInfo: any = localStorage.getItem('loggedInUserInfo');

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private editProfileService: EditProfileService,
    private profileDataService: ProfileDataService,
    private addContentService: AddContentService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      bio: [''],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      grade: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log("=========================>")
    this.userId = localStorage.getItem('id');

    //gt the user info from local storage first
    const storedUser = localStorage.getItem('loggedInUserInfo');
    if (storedUser) {
      this.loggedInUserInfo = JSON.parse(storedUser);
      this.prefillForm(this.loggedInUserInfo);
    }
    console.log('loggedInUserInfo');
    console.log('userId from localStorage:', localStorage.getItem('id'));

    //fetch the data from backen if needed
    if (this.userId) {
      this.profileDataService.getOwnProfile(this.userId).subscribe(
        (data) => {
          console.log('Fetched profile:', data);
          this.loggedInUserInfo = data;

          // this.prefillForm(data);

          //if the data fetched does not have grade then it fetches from local storage
          if (!data.grade) {
            this.profileForm.patchValue({
              grade: localStorage.getItem('grade') || '',
            });
          }
          (error: any) => {
            console.error('Error fetching own profile:', error);
          };

          this.prefillForm(data);

          // if (data.grade) {
          //   this.prefillForm(data);
          // } else {
          //   this.profileForm.patchValue({
          //     grade: localStorage.getItem('grade') || '',
          //   });
          // }
        },
        (error) => {
          console.error('Error fetching own profile:', error);
        }
      );
    }
  }

  prefillForm(data: any): void {
    this.profileForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      phone: data.phone,
      grade: data.grade || localStorage.getItem('selectedGrade') || '',
      subjects:  data.subjects || JSON.parse(localStorage.getItem('selectedSubjects') || '[]'),
    });

    // Prefill profile picture if available
    if (data.imageUrl) {
      this.selectedImage = data.imageUrl;
    }

    if (data.subjects) {
      this.selectedSubjects = data.subjects;
    }
  }

  saveEdittedProfile(): void {
    console.log('saveEdittedProfile triggered');

    // if (!this.userId) {
    //   console.error('User ID is null');
    //   return;
    // }

    if (this.profileForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    if (this.userId) {
      console.log('form sent to server');
      console.log(this.profileForm.value);

      const updatedProfileData = {
        ...this.profileForm.value,
        imageUrl: this.selectedImage,
      };

      // Call the service to save the profile data
      this.editProfileService
        .updateUserProfile(this.userId, updatedProfileData)
        .subscribe(
          (response: any) => {
            console.log('Profile updated successfully:', response);

            // Update localStorage with new data
            const updatedUserData = {
              ...this.loggedInUserInfo,
              ...updatedProfileData,
            };

            localStorage.setItem(
              'loggedInUserInfo',
              JSON.stringify(updatedUserData)
            );

            sessionStorage.setItem(
              'loggedInUserInfo',
              JSON.stringify(updatedUserData)
            );

            //this will update the form with new values
            this.profileForm.patchValue(updatedProfileData);

            this.showToast('Profile updated successfully!');

            setTimeout(() => {
              this.router.navigate(['/profile']).then(() => {
                window.location.reload();
              });
            }, 3000);
          },
          (error: any) => {
            console.error('Error updating profile:', error);
            this.showToast('Failed to update profile.');
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }

  // loadProfile(userId: string) {
  //   if(userId){
  //     this.editProfileService.getProfile(userId).subscribe(
  //       (profile) => {
  //         console.log('Fetched profile:', profile);

  //         //this then updates the form with thte recent new details
  //         this.profileForm.patchValue(profile);
  //       },
  //       (error) => {
  //         console.error('Error fetching profile:', error);
  //       }
  //     );
  //   }

  // }

  showToast(message: string) {
    this.toastMessage = message;
    console.log(this.toastMessage)
    this.isToastMessageVisible = true;

    setTimeout(() => {
      this.isToastMessageVisible = false;
    }, 3000);
    console.log(this.toastMessage);
  }

  async onFileSelected($event: any) {
    const reader = new FileReader();

    const file: File = $event!.target!.files[0];
    this.selectedImage = URL.createObjectURL(file);
    reader.readAsDataURL(file);
    reader.onload = ($file) => {
      this.selectedImage = $file.target?.result?.toString() || '';
      console.log(this.selectedImage);
    };
  }
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {

  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //     };

  //     reader.readAsDataURL(file);
  //     this.addContentService.uploadProfilePicture(event.target.files[0]);
  //   }
  // }

  // onFileSelected(event: Event): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // const file = input.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //     };

  //     this.addContentService.uploadProfilepicture(file)
  //     this.addContentService.uploadProfilepicture(event.target.files[0]);

  //     reader.readAsDataURL(file);

  //   }
  // }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

}