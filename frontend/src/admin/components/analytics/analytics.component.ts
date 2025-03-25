import { Component, type OnInit } from "@angular/core"
import { AdminService } from "../../services/admin.service"
import { CommonModule } from "@angular/common"
import { SidebarComponent } from "../sidebar/sidebar.component"

@Component({
  selector: "app-analytics",
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.css"],
})
export class AnalyticsComponent implements OnInit {
  analyticsData: any = {
    mostActiveSubject: "Loading...",
    userGrowth: "Loading...",
    communityGrowth: "Loading...",
    resourceSharingRate: "Loading...",
  }

  donationSummary: any = {
    totalDonations: 0,
    topDonor: { fullName: "Loading...", amount: 0 },
    donorCount: 0,
  }

  newUsersCount = 0

  constructor(public adminService: AdminService) {}

  ngOnInit() {
    this.getAnalyticsData()
    this.getDonationSummary()
    this.getNewUsersCount()
    this.adminService.getDashboardDataForComponents();
  }

  getAnalyticsData() {
    this.adminService.getAnalyticsData().subscribe(
      (data) => {
        console.log(data)
        this.analyticsData = data
      },
      (error) => {
        console.error("Error fetching analytics data:", error)
        // Set fallback data
        this.analyticsData = {
          mostActiveSubject: "N/A",
          userGrowth: "N/A",
          communityGrowth: "N/A",
          resourceSharingRate: "N/A",
        }
      },
    )
  }

  getDonationSummary() {

    
            this.donationSummary = {
              totalDonations: 0,
              topDonor: {
                fullName:
                  this.adminService.calculateTopDonor().fullName || 'N/A',
                amount: this.adminService.calculateTopDonor().maxSofar || 0,
              },
              donorCount: 0,
            };

  }

  getNewUsersCount() {

    this.newUsersCount = this.adminService.getTotalUsers()
    // const thirtyDaysAgo = new Date()
    // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    // this.adminService.getNewUsersCount(thirtyDaysAgo.toISOString().split("T")[0]).subscribe(
    //   (count) => {
    //     this.newUsersCount = count
    //   },
    //   (error) => {
    //     console.error("Error fetching new users count:", error)
    //     this.newUsersCount = 0
    //   },
    // )
  }

  formatAmount(amount: number): string {
    return `R${amount.toLocaleString()}`
  }
}

