import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../types/user.interface';
import { UserProfileService } from '../../services/userProfile.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-management',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css',
})
export class ProfileManagementComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  selectedImage: string | null = null;

  showToastMessage: string = '';
  isToastMessageVisible = false;
  currentUser!: User;

  constructor(private fb: FormBuilder,
     private router: Router,
     private userProfileService: UserProfileService,
     private authService: AuthService,
    ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      bio: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      grade: ['', [Validators.required]],
      role: [''],
      saceNumber: [''],
      imageUrl: [''],
    });
  }

  ngOnInit(){
    // this.loadUserProfile(); 
    this.getUserProfile();
  }

  ngOnDestroy() { 
    this.showToastMessage = '';
    this.isToastMessageVisible = false;
  }


  getUserProfile(): void {
    // const userId = localStorage.getItem('userId'); // Retrieve stored userId
    // if (userId) {
    //   this.authService.getUserProfile(+userId).subscribe(
    //     (response) => {
    //       this.user = response;
    //       if (this.user.imageUrl) {
    //         this.profileImage = this.user.imageUrl; // Update profile picture if available
    //       }
    //     },
    //     (error) => {
    //       console.error('Error fetching user profile:', error);
    //     }
    //   );
    }

  // loadUserProfile() {
  //   this.userProfileService.getCurrentUser().subscribe((data: User) => {
  //     this.currentUser = data;


      // this.profileForm.patchValue({
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   bio: data.bio || '',
      //   // email: data.email,
      //   phoneNumber: data.phone,
      //   imageUrl: data.imageUrl || '',
      //   grade: data.grade,
      //   gradeId: data.grade, 
      //   subjectIds: data.subjects || [],
      //   role: data.role,
      //   saceNumber: data.role === 'TEACHER' ? data.saceNumber || '' : '',
      // });


  //     if (data.imageUrl) {
  //       this.selectedImage = data.imageUrl; 
  //     }
  //   })
    
  // }

  saveProfile() {
    if (this.profileForm.valid) {
      this.isToastMessageVisible = true;
      console.log('Form submitted successfully:', this.profileForm.value);

      this.userProfileService.updateUserProfile(this.profileForm.value).subscribe((response: any) => {
        console.log('Profile updated successfully:', response);
        this.showToast('Profile set up successfully!');
        setTimeout(() => {
          this.isToastMessageVisible = false;
          this.router.navigate(['/home']);
        }, 3000);
      });
    } else {
      console.log('Form is invalid', this.profileForm.errors);
    }
  }

  showToast(message: string) {
    this.showToastMessage = message;
    console.log('show toast message');
    this.isToastMessageVisible = false;

    setTimeout(() => {
      this.isToastMessageVisible = false;
    }, 50000);
    console.log('toast message works');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result as string; 
        this.profileForm.patchValue({ imageUrl: this.selectedImage });
      };

      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
