// import { routes } from './../../app.routes';
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';

// import {
//   AbstractControl,
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../../types/user.interface';
// @Component({
//   selector: 'app-signup',
//   imports: [CommonModule, ReactiveFormsModule, RouterLink],
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent {
//   signupForm!: FormGroup;

//   selectedRole: 'student' | 'teacher' = 'teacher';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.signupForm = this.fb.group(
//       {
//         name: ['', Validators.required],
//         surname: ['', Validators.required],
//         phoneNumber: [
//           '',
//           [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
//         ],
//         role: ['', Validators.required],
//         saceNumber: [''],
//         password: ['', [Validators.required, Validators.minLength(6)]],
//         confirmPassword: ['', Validators.required],
//       },
//       { validator: this.passwordsMatchValidator }
//     );
//   }

//   //this checks if the password matches, if not the errors are displayed
//   passwordsMatchValidator(form: AbstractControl) {
//     const password = form.get('password')?.value;
//     const confirmPassword = form.get('confirmPassword')?.value;

//     if (password !== confirmPassword) {
//       form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
//     } else {
//       form.get('confirmPassword')?.setErrors(null);
//     }
//     return null;
//   }

//   onRoleChange(role: 'student' | 'teacher') {
//     this.selectedRole = role;
//     this.signupForm.get('role')?.setValue(role);
//     if (role === 'teacher') {
//       this.signupForm.get('saceNumber')?.setValidators([Validators.required]);
//     } else {
//       this.signupForm.get('saceNumber')?.clearValidators();
//       this.signupForm.get('saceNumber')?.setValue('');
//     }
//     this.signupForm.get('saceNumber')?.updateValueAndValidity();
//   }

//   //this functionallows the user to sign up then routes to homepage after validating the form

//   onSubmit() {
//     if (this.signupForm.valid) {
//       const user: User = {
//         firstName: this.signupForm.value.name,
//         lastName: this.signupForm.value.surname,
//         phone: this.signupForm.value.phoneNumber,
//         role: this.signupForm.value.role,
//         password: this.signupForm.value.password,
//         imageUrl: 'user.svg',
//       };
//       console.log('Sign up data: ', user);

//       this.authService.register(user).subscribe((res) => {
//         console.log(res);
//       });
//       this.router.navigate(['/About-You']);
//     } else {
//       alert('Form is invalid. Please check your inputs.');
//     }
//   }
// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user.interface';
@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  selectedRole: 'STUDENT' | 'TEACHER' = 'TEACHER';

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    // private ngxLoader: NgxUiLoaderService
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        role: ['', Validators.required],
        saceNumber: ['', Validators.pattern(/^[0-9]{10}$/)],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  //this checks if the password matches, if not the errors are displayed
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

  onRoleChange(role: 'STUDENT' | 'TEACHER') {
    this.selectedRole = role;
    console.log(role);
    this.signupForm.get('role')?.setValue(role);
    if (role === 'TEACHER') {
      this.signupForm.get('saceNumber')?.setValidators([Validators.required]);
    } else {
      this.signupForm.get('saceNumber')?.clearValidators();
      this.signupForm.get('saceNumber')?.setValue('');
    }
    this.signupForm.get('saceNumber')?.updateValueAndValidity();
  }

  //this functionallows the user to sign up then routes to homepage after validating the form
  onSubmit() {
    if (this.signupForm.valid) {

       // Set loading to true when the signup request starts
    this.loading = true;


      const user: User = {
        id: 1,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        phone: this.signupForm.value.phone,
        saceNumber: this.signupForm.value.saceNumber,
        role: this.selectedRole,
        password: this.signupForm.value.password,
        grade: null,
        badges: '',
        communities: [],
        posts: [],
        connections: []
      };

     setTimeout(() => {
       this.loading = false;
       this.router.navigate(['/about-you']);
     }, 3000);

      this.authService.register(user).subscribe(res => {
        if(res.id) {
          localStorage.setItem('id', res.id?.toString());
          localStorage.setItem('loggedInUserInfo', JSON.stringify(res));
        }
      });

    } else {
      alert('Form is invalid. Please check your inputs.');
    }
  }
}
