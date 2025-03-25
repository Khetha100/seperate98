import { Component, Input } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
@Input() activePage: string = '';

  constructor(private router: Router, private adminService: AdminService) {}

  signOut() {
    this.adminService.signOut().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error signing out:', error);
      }
    );
  }
}
