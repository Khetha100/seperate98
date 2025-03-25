import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// import { OwnProfileComponent } from './components/own-profile/own-profile.component';
import { EditOwnProfileComponent } from './components/edit-own-profile/edit-own-profile.component';
import { PostComponent } from './components/post/post.component';
// import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
