import { Component, OnInit } from '@angular/core';
// import { InfoNavComponent } from '../info-nav/info-nav.component';
import { InsideNavComponent } from "../inside-nav/inside-nav.component";
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AddOrRemoveCommunityMembersComponent } from '../add-or-remove-community-members/add-or-remove-community-members.component';
import { Community } from '../../types/community.interface';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddCommunityMembersComponent } from '../add-community-members/add-community-members.component';
import { RemoveCommunityMembersComponent } from '../remove-community-members/remove-community-members.component';
import { User } from '../../types/user.interface';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-inside-communities',
  imports: [InsideNavComponent, RouterLink, NavbarComponent, CommonModule],
  templateUrl: './inside-communities.component.html',
  styleUrl: './inside-communities.component.css',
})
export class InsideCommunitiesComponent implements OnInit {
  loggedUserId: number = 0;

  

  constructor(
    private matDialog: MatDialog,
    public communityService: CommunityService
  ) {}
  ngOnInit(): void {
    this.communityService
      .getCommunityMembers(this.communityService.communityClickedId)
      .subscribe((members) => {
        console.log(members);
        this.communityService.communityMembersList.set(members);
      });
    this.loggedUserId = Number(localStorage.getItem('id'));
  }

  openAddDialog(): void {
    // if (this.numberChecked == 3 && this.communityForm.valid) {
    this.matDialog.open(AddCommunityMembersComponent);
  }

  openRemoveDialog(): void {
    // if (this.numberChecked == 3 && this.communityForm.valid) {
    this.matDialog.open(RemoveCommunityMembersComponent);
  }

  // myClick(event?: any){
  //   event.preventDefault();
  //   console.log('clicked');
  //   event.target.querySelector('myclass').hidden = false;
  // }
  isPopupVisible = false;

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  isAdmin(): boolean {
    let myBool: boolean = false;
    this.communityService.communityUserRole().forEach((memberRole) => {
      if (
        memberRole.community?.id == this.communityService.communityClickedId
      ) {
        if (
          Number(localStorage.getItem('id')) == memberRole.userInfo?.id &&
          memberRole.communityRole == 'admin'
        ) {
          myBool = true;
        }
      }
    });
    return myBool;
  }

  removeCommunityMember(userId?: number) {
    console.log('inside remove function');
    console.log(userId);
    console.log(this.communityService.communityUserRole);
    this.communityService.communityUserRole().forEach((userIdRole) => {
      if (userIdRole.userInfo?.id == userId && userIdRole.id) {
        this.communityService.communityMembersList.set(
          this.communityService.communityMembersList().filter(
            (member) => member.id != userIdRole.userInfo?.id
          ))
        this.communityService
          .removeCommunityMember(userIdRole.id)
          .subscribe((res) => {
            console.log(res);
          });
      }
    });
  }
}
