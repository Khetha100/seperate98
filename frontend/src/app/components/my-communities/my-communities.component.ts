import { Component, Input, signal, TrackByFunction } from '@angular/core';
import { InsideNavComponent } from "../inside-nav/inside-nav.component";
import { CommonModule } from '@angular/common';
import { Community } from '../../types/community.interface';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommunityService } from '../../services/community.service';
import { ValueChangeEvent } from '@angular/forms';
import { CommunityUserRole } from '../../types/communityUserRole.interface';
import { ReportModalComponent } from "../report-modal/report-modal.component";

@Component({
  selector: 'app-my-communities',
  imports: [InsideNavComponent, CommonModule, RouterLink, NavbarComponent, ReportModalComponent],
  templateUrl: './my-communities.component.html',
  styleUrl: './my-communities.component.css',
})
export class MyCommunitiesComponent {
  @Input() listOfCommunities: Community[] = [];
  i: any;
  community: any;
  trackByIndex: TrackByFunction<Community> = (index, item) => item.id;
  communityList = signal<any[]>([]);

  constructor(public communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getCommunityList().subscribe((res) => {
      this.communityService.allCommunities.set(res);
    });

    this.communityService.getCommunityUserRole().subscribe((res) => {
      this.communityService.communityUserRole.set(res);
    });

    this.communityService.communityUserRole;

    this.communityService.getCommunityUserRole().subscribe((res) => {
      this.communityService.publicCommunitiesToJoin().splice(
        0,
        this.communityService.publicCommunitiesToJoin.length
      );
      this.communityService.yourCommunities().splice(
        0,
        this.communityService.yourCommunities.length
      );
      res.forEach((userComRole) => {
        let check1: boolean = this.checkIfAlreadyAddedCommunity(
          userComRole,
          this.communityService.yourCommunities()
        );

        if (
          userComRole.userInfo?.id == Number(localStorage.getItem('id')) &&
          userComRole.community
        ) {
          if (!check1) {
            this.communityService.yourCommunities().push(userComRole.community);
          }
        }
      });
    });
  }

  onCommunityCreated(community: any) {
    this.communityList.update((list) => [community, ...list]);
  }

  onClick(newId?: number) {
    if (newId) {
      this.communityService.setCommunityClickedId(newId);
    }
  }

  addCommunityMember() {
    const userId: number = Number(localStorage.getItem('id'));
    const communityObj: CommunityUserRole = {
      userInfoId: userId,
      communityId: this.communityService.communityClickedId,
      communityRole: 'member',
    };

    this.communityService.getCommunityUser(userId).subscribe((res) => {
      console.log(res);
      this.communityService.communityMembersList().push(res);
    });

    console.log(communityObj);
    this.communityService.addCommunityMember(communityObj).subscribe((res) => {
      console.log(res);
    });
  }

  checkIfAlreadyAddedCommunity(
    communityUserRole: CommunityUserRole,
    community: Community[]
  ) {
    let myBool: boolean = false;
    community.forEach((com) => {
      if (communityUserRole.community?.id == com.id) {
        myBool = true;
      }
    });
    return myBool;
  }
}
