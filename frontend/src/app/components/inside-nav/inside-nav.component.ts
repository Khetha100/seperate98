import { Component, OnInit } from '@angular/core';
import { HamburgerComponent } from "../hamburger/hamburger.component";
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inside-nav',
  imports: [HamburgerComponent],
  templateUrl: './inside-nav.component.html',
  styleUrl: './inside-nav.component.css'
})
export class InsideNavComponent implements OnInit {
  pageTitle = ""

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.setPageTitle()
    })

    // Set initial page title
    this.setPageTitle()
  }

  setPageTitle() {
   const currentRoute = this.router.url
    switch (true) {
      case currentRoute.includes("/edit-own-profile"):
        this.pageTitle = "Edit Profile"
        break
      case currentRoute.includes("/notifications"):
        this.pageTitle = "Notifications"
        break
      case currentRoute.includes("/badges"):
        this.pageTitle = "Badges"
        break
      case currentRoute == "/community":
        this.pageTitle = "Community"
        break
      case currentRoute == "/myCommunity":
        this.pageTitle = "My Communities"
        break
      default:
        this.pageTitle = "" // No words for other routes
    }
  }

  goBack() {
    this.location.back()
  }
}

