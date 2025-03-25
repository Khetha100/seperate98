import { Donations } from './../../types/donation.interface';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Dashboard } from '../../types/dashboard.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getDashboardDataForComponents();
  }




}
