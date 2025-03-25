import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signinForm!: FormGroup;
  selectedRole: 'student' | 'teacher' = 'student';

  loggedInUserId: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onSubmit() {
    console.log(this.signinForm.value);

    const loginObj: any = {
      phone: this.signinForm.value.phoneNumber,
      password: this.signinForm.value.password,
    };

    this.authService.login(loginObj).subscribe((res) => {
      console.log(res);


        if(res.userInfo.id){
          this.loggedInUserId = res.userInfo.id;
          console.log(this.loggedInUserId);
          this.authService.userData = res.userInfo;
          localStorage.setItem('loggedInUserInfo',JSON.stringify(res.userInfo));
          localStorage.setItem('id', this.loggedInUserId.toString());
          this.router.navigate(['/home'])
        }

    });
  }
}
