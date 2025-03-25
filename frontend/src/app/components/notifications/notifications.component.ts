import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { InsideNavComponent } from "../inside-nav/inside-nav.component";
import { NotificationsService } from '../../services/notifications.service';
import { Notifications } from '../../types/notification.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [InsideNavComponent, NavbarComponent, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Notifications[] = [];
  userId = 1; // Hardcoded for now, replace with actual logged-in user ID

  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
      this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(this.userId).subscribe((data) => {
      this.notifications = data;
    });
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
    });
  }
}
