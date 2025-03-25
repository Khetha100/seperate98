import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sign-in',
  imports: [RouterLink,
      ReactiveFormsModule,
        CommonModule,
        FormsModule],
  templateUrl: './admin-sign-in.component.html',
  styleUrl: './admin-sign-in.component.css'
})
export class AdminSignInComponent {
    signInForm: FormGroup;
    isLoading = false;
    error: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private adminService: AdminService,
      private router: Router
    ) {
      this.signInForm = this.fb.group(
        {
          email: ['', [Validators.required]],
          password: ['', [Validators.required]],
        },
      );
    }

  
    onSubmit() {
      if (this.signInForm.valid) {
        this.isLoading = true;
        this.error = null;
  
        const signInData = {
          email: this.signInForm.value.email,
          password: this.signInForm.value.password,
        };
  
        this.adminService.signIn(signInData).subscribe({
          next: (response) => {
            this.router.navigate(['/admin/admin']);
          },
          error: (error) => {
            console.error('Sign up error:', error);
              this.error = 'Failed to login to your account. Please try again.';

            this.isLoading = false;
          },
        });
      }
    }
}
