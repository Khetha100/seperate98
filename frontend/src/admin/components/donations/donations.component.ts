import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {
  donations: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getDonations();
  }

  getDonations() {
    this.adminService.getDonations().subscribe(
      (data) => {
        console.log(data)
        this.donations = data;
      },
      (error) => {
        console.error("Error fetching donations:", error);
      }
    );
  }

  formatAmount(amount: number): string {
    return `R${amount.toLocaleString()}`;
  }
}
