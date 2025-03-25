import { Component } from '@angular/core';
import { InsideNavComponent } from "../inside-nav/inside-nav.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { Badge, BadgesService } from '../../services/badges.service';


@Component({
  selector: 'app-badges',
  imports: [InsideNavComponent, CommonModule, NavbarComponent],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.css'
})

export class BadgesComponent {
  badges: Badge[] = []
  

  constructor(private badgesService: BadgesService) {
    this.badges = this.badgesService.getBadges();
  }
  

}

