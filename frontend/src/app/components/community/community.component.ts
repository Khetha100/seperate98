import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { InsideNavComponent } from "../inside-nav/inside-nav.component";
import { CommunityService } from '../../services/community.service';
import { CommunityUserRole } from '../../types/communityUserRole.interface';
import { Community } from '../../types/community.interface';

@Component({
  selector: 'app-community',
  imports: [NavbarComponent, RouterLink, InsideNavComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit {

  constructor(private communityService: CommunityService) { }
  ngOnInit(): void {
    this.communityService.initial();
  }

}
