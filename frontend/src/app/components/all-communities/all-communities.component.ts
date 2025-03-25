import { Component, Input, signal, TrackByFunction } from '@angular/core';
import { InsideNavComponent } from '../inside-nav/inside-nav.component';
import { CommonModule } from '@angular/common';
import { Community } from '../../types/community.interface';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommunityService } from '../../services/community.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { searchInterface } from '../../types/search.interface';
import { CommunityUserRole } from '../../types/communityUserRole.interface';
import { ReportModalComponent } from "../report-modal/report-modal.component";
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";

@Component({
  selector: 'app-my-communities',
  imports: [
    InsideNavComponent,
    CommonModule,
    RouterLink,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    ReportModalComponent,
],
  templateUrl: './all-communities.component.html',
  styleUrl: './all-communities.component.css',
})
export class AllCommunitiesComponent {
showDeleteModal() {

}

  communityList = signal<any[]>([]);

  searchCommunityForm: FormGroup;

  searchObj: searchInterface | undefined;


  constructor(
    public communityService: CommunityService,
    private fb: FormBuilder
  ) {
    this.searchCommunityForm = this.fb.group({
      searchedCommunity: [''],
    });
  }

  searchResult: Community[] = [];

  ngOnInit(): void {

  }



  searchCommunityFunct() {
    console.log(this.searchCommunityForm.value.searchedCommunity);
    this.searchObj = {
      user: '',
      post: '',
      communityTitle: this.searchCommunityForm.value.searchedCommunity,
      communityDescription: this.searchCommunityForm.value.searchedCommunity,
    };

    this.communityService.searchCommunity(this.searchObj).subscribe((res) => {
      console.log(res);

      this.searchResult.splice(0, this.searchResult.length);
      this.communityList().splice(0, this.communityList().length);
      res.forEach((element) => {
        this.searchResult.push(element);
        this.communityList().push(element);
      });
    });
  }



  onClick(newId?: number) {
    if (newId) {
      this.communityService.setCommunityClickedId(newId);
    }
  }

  addCommunityMember(communityId?: number) {
    if (communityId) {
      const userId: number = Number(localStorage.getItem('id'));
      const communityObj: CommunityUserRole = {
        userInfoId: userId,
        communityId: communityId,
        communityRole: 'member',
      };

      this.communityService.getCommunityUser(userId).subscribe((res) => {
        console.log(res);
        this.communityService.communityMembersList().push(res);
      });


      // this.communityService
      //   .addCommunityMember(communityObj)
      //   .subscribe((res) => {
      //   });
    }
  }




}