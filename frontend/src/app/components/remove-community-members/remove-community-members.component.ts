import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchService } from '../../services/search.service';
import { searchInterface } from '../../types/search.interface';
import { User } from '../../types/user.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommunityService } from '../../services/community.service';
import { CommunityUserRole } from '../../types/communityUserRole.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remove-community-members',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './remove-community-members.component.html',
  styleUrl: './remove-community-members.component.css',
})
export class RemoveCommunityMembersComponent {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RemoveCommunityMembersComponent>,
    private searchService: SearchService,
    private communityService: CommunityService
  ) {
    this.searchForm = this.fb.group({
      searchPeople: ['', Validators.required],
    });
  }

  searchObj: searchInterface | undefined;

  searchResult: User[] = [];

  // communityMembersList: User[] = [];

  close(): void {
    this.dialogRef.close('closed!');
  }

  searchPersonFunct() {
    console.log('ABOUT TO REMOVE THE PERSON');
    console.log(this.searchForm.value.searchPeople);
    this.searchObj = {
      user: this.searchForm.value.searchPeople,
      post: '',
      communityTitle: '',
      communityDescription: '',
    };

    this.searchService.searchPerson(this.searchObj).subscribe((res) => {
      console.log(res);
      this.searchResult.splice(0, this.searchResult.length);
      res.forEach((element) => {
        this.searchResult.push(element);
      });
    });
  }

  removeCommunityMember(userId: number) {
    console.log("inside remove function");
    console.log(userId);
    console.log(this.communityService.communityUserRole);
    this.communityService.communityUserRole().forEach((userIdRole) => {
      console.log("inside loop")
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
    })
    }
}
