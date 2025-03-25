import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OtpService } from '../../services/otp.service';
import { Otp } from '../../types/Otp.interface';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private otpService: OtpService
  ) {
    this.forgotPasswordForm = this.fb.group({
      phone: [
        '',
        [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')],
      ], // Validate phone number format
    });
  }

  onSubmit() {
    this.otpService.phone = this.forgotPasswordForm.value.phone;
    const otp: Otp = {
      phone: this.forgotPasswordForm.value.phone,
      password: '',
    };
    this.otpService.verifyNumber(otp).subscribe((res) => {
      console.log(res);
      if (res.status == 'success') {
        this.router.navigate(['/passwordReset']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/signin']); // Navigate back to the login page
  }
}
