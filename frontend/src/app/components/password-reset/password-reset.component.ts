import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OtpService } from '../../services/otp.service';
import { Otp } from '../../types/Otp.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
})
export class PasswordResetComponent {
  PasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private otpService: OtpService
  ) {
    this.PasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.PasswordForm.valid) {
      const otp: Otp = {
        phone: this.otpService.phone,
        password: this.PasswordForm.value.password,
      };
      console.log('Sign up data: ', otp);

      this.otpService.resetPassword(otp).subscribe((res) => {
        console.log(res);
      });
      this.router.navigate(['/signin']);
    } else {
      alert('Form is invalid. Please check your inputs.');
    }
  }

  goBack() {
    this.router.navigate(['/signin']); // Navigate back to the login page
  }
}
