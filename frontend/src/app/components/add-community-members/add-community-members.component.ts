import { CommunityService } from './../../services/community.service';
import { SearchService } from './../../services/search.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { searchInterface } from '../../types/search.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../types/user.interface';
import { CommonModule } from '@angular/common';
import { CommunityUserRole } from '../../types/communityUserRole.interface';

@Component({
  selector: 'app-add-community-members',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-community-members.component.html',
  styleUrl: './add-community-members.component.css',
})
export class AddCommunityMembersComponent {

  searchForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AddCommunityMembersComponent>,
    private searchService: SearchService,
    private communityService: CommunityService
  ) {

    this.searchForm = this.fb.group({
      searchPeople: ['', Validators.required]
    });

  }

  searchResult:User[] = []


  searchObj: searchInterface | undefined;

  close(): void {
    this.dialogRef.close('closed!');
  }

  searchPersonFunct() {
    console.log("ABOUT TO ADD THE PERSON");
    console.log(this.searchForm.value.searchPeople);
    this.searchObj = {
      user: this.searchForm.value.searchPeople,
      post: '',
      communityTitle: '',
      communityDescription: '',
    };

    this.searchService.searchPerson(this.searchObj).subscribe((res) => {
      console.log(res);
      this.searchResult.splice(0, this.searchResult.length)
      res.forEach(element => {
        this.searchResult.push(element);
      });
    });
  }

  addCommunityMember(userId:number){
    const communityObj: CommunityUserRole = {
      userInfoId: userId,
      communityId: this.communityService.communityClickedId,
      communityRole: 'member',
    };

    this.communityService.getCommunityUser(userId).subscribe((res) =>{
      console.log(res)
      this.communityService.communityMembersList().push(res);
    })

    console.log(communityObj);
  this.communityService.addCommunityMember(communityObj).subscribe((res) =>{
    console.log(res)
  })
    
    // this.communityService.initial();
  }

}
