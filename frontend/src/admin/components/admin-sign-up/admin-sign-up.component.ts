import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sign-up',
  imports: [RouterLink,
      ReactiveFormsModule,
      CommonModule,
      FormsModule,],
  templateUrl: './admin-sign-up.component.html',
  styleUrl: './admin-sign-up.component.css',
})
export class AdminSignUpComponent {
  signUpForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Added Validators.email
      password: ['', [Validators.required, Validators.minLength(6)]], // Added Validators.minLength(6)
    });
  }

  onSubmit(event: Event) {

    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.error = null;

      console.log(this.signUpForm.value);

      const signUpData = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
      };

      this.adminService.signUp(signUpData).subscribe((response) => {
        this.router.navigate(['/admin/admin'], { replaceUrl: true });
        console.log(response);
      });
    }
  }
}

