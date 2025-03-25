import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user.interface';

@Component({
  selector: 'app-hamburger',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.css',
})
export class HamburgerComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Check if user ID exists in localStorage
    this.checkLoginStatus();

    // Subscribe to auth state changes
    this.authService.authState$.subscribe((authState: User | null) => {
      this.isLoggedIn = !!authState || this.isUserLoggedInLocally();
    });
  }

  // Check if user is logged in based on localStorage
  private isUserLoggedInLocally(): boolean {
    return !!localStorage.getItem('id');
  }

  // Update login status based on localStorage and auth service
  private checkLoginStatus(): void {
    this.isLoggedIn = this.isUserLoggedInLocally();
  }

  signInOrOut() {
    if (this.isLoggedIn) {
      // Sign out
      this.authService.logout().subscribe({
        next: () => {
          // Clear localStorage items
          localStorage.removeItem('id');
          localStorage.removeItem('loggedInUserInfo');
          localStorage.removeItem('userEmail');

          // Update login status
          this.isLoggedIn = false;

          // Navigate to home or login page
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error('Error signing out:', error);

          // Even if the backend call fails, clear local data
          localStorage.removeItem('id');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('loggedInUserInfo');
          this.isLoggedIn = false;
          this.router.navigate(['/signin']);
        },
      });
    } else {
      // Navigate to sign in page
      this.router.navigate(['/signin']);
    }
  }
}
