// import { Injectable } from '@angular/core';
// import {  User } from '../types/user.interface';
// import { BehaviorSubject, map, Observable, tap } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   [x: string]: any;
//   private authState: BehaviorSubject<User  | null> =
//     new BehaviorSubject<User | null>(null);
//   authState$ = this.authState.asObservable();


  // loggedInUserData: User = {id: 0,
  // firstName: "",
  // lastName: "",
  // phone: "",
  // role: 'student',
  // password: "",
  // imageUrl: ""};

//   apiUrl: string = environment.SERVER;

//   // constructor(private registerService: RegisterService ,private loginService: LoginService, private http:HttpClient) { }
//   constructor(private http: HttpClient) {}

//   // register() {
//   //   if (this.user.roles == "teacherUser") {
//   //     const teacherUser: TeacherUser | User | null = this.registerService.createTeacherUser(this.tUser).pipe(
//   //       tap((response) => {
//   //         console.log(response);
//   //       })
//   //     );
//   //     this.authState.next(teacherUser);
//   //   }
//   //   const user: TeacherUser | User | null = this.registerService.createUser(this.user).pipe(
//   //     tap((response) => {
//   //       console.log(response)
//   //     })
//   //   )
//   //   this.authState.next(user);
//   // }

//   register(user: User): Observable<User> {
//     // console.log("User from user Service is : ", user);
//     return this.http.post<User>(this.apiUrl + '/registration/users', user);
//   }

//   login(loginObj: any): Observable<User > {
//     return this.http.post<User >(
//       this.apiUrl + '/login/users',
//       loginObj
//     );
//   }

//   logout() {
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('id');
//     this.authState.next(null);
//   }
// }


import { Injectable } from '@angular/core';
import { signinResponse, User } from '../types/user.interface';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  authState$ = this.authState.asObservable();

  apiUrl: string = environment.SERVER + '/api/v1/auth';

  clickedUserId: number = 0;

  userData: User = {
    id: 1,
    firstName: '',
    lastName:'',
    bio: '',
    phone: '',
    saceNumber: '',
    imageUrl: '',
    password: '',
    role: 'STUDENT',
    subjects: [],
    badges: '',
    grade: 0,
    communities: [],
    posts: [],
    connections: []};

  constructor(private http: HttpClient) {
    // Fetch the current user on app load
    this.loadCurrentUser();
  }

  setClickedUserId(id:number) {
    this.clickedUserId = id;
  }



  // register(user: User): Observable<User> {
  //   this.authState.next(user)
  //   return this.http.post<User>(this.apiUrl + '/signup', user);
  // }

  // login(loginObj: User): Observable<User> {
  //   this.authState.next(loginObj)
  //   return this.http.post<User>(
  //     this.apiUrl + '/signin',
  //     loginObj
  //   );
  // }

  register(user: User): Observable<User> {
    this.authState.next(user);
    return this.http.post<User>(this.apiUrl + '/signup', user);
  }

  login(loginObj: User): Observable<signinResponse> {
    console.log(loginObj);
    this.authState.next(loginObj);
    return this.http.post<signinResponse>(this.apiUrl + '/signin', loginObj);
  }

  logout() {
    this.authState.next(null);
    return this.http.get(this.apiUrl + '/signout')
  }

  get currentUser(): Observable<User | null> {
    return this.authState$;
  }

  getUserId(): Observable<string> {
    return this.http.get<string>('/getUserId');
  }

  // getSessionUser(): Observable<UserProfile> {
  //   return this.http.get<UserProfile>(`${this.apiUrl}/session`);
  // }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/{userId}`);
  }

  getUserProfileById(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/v1/profiles/${userId}`)
  }

  loadCurrentUser(): void {
    this.http.get<User>('/current-user').subscribe(
      (user) => {
        this.authState.next(user);  // Update the current user data
      },
      (error) => {
        this.authState.next(null);
      }
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getAllUserProfiles(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/api/v1/profiles')
  }

}
