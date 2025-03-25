import { AddContentService } from './../../services/add-content.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Community } from '../../types/community.interface';
import { ModalComponent } from '../modal/modal.component';
import * as uuid from 'uuid';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommunityService } from '../../services/community.service';

import { InsideNavComponent } from '../inside-nav/inside-nav.component';
import { CommunityUserRole } from '../../types/communityUserRole.interface';
import { BadgesService } from '../../services/badges.service';

@Component({
  selector: 'app-create-community',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InsideNavComponent,
  ],
  templateUrl: './create-community.component.html',
  styleUrl: './create-community.component.css',
})
export class CreateCommunityComponent {
  communityForm: FormGroup;
  numberChecked: number = 0;
  mystrrMsg: string = '';
  formComplete: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private communityService: CommunityService,
    private BadgesService: BadgesService,
    private addContentService: AddContentService
  ) {
    this.communityForm = this.fb.group({
      communityName: ['', Validators.required],

      pubOrPriv: ['', Validators.required],

      communityDescription: ['', Validators.required],
    });
  }
  ngOnInit(): void {

    this.addContentService.uuidValue = `${uuid.v4().toLowerCase()}`;
  }

  openDialog(): void {
    if (this.numberChecked == 3 && this.communityForm.valid) {
      this.matDialog.open(ModalComponent, {
        width: '30%', height: '50%' , data: {
          badgeId: 1,
        }
      });

      const community: Community = {
        name: this.communityForm.value.communityName,
        description: this.communityForm.value.communityDescription,
        pubOrPriv: this.communityForm.value.pubOrPriv,
        communityPicture: this.addContentService.communityPicture,
        communityMembersNumber: 1,
        communityCreatorId: Number(localStorage.getItem('id')),
      };

      this.communityService.createCommunity(community).subscribe((res) => {
        if (res.id && localStorage.getItem('id')) {
          const roleAttach: CommunityUserRole = {
            userInfoId: Number(localStorage.getItem('id')),
            communityId: res.id,
            communityRole: 'admin',
          };
          this.communityService.addCommunityMember(roleAttach).subscribe((res) => {
            console.log(res)
           });
           this.BadgesService.awardBadge(
             Number(localStorage.getItem('id')),
             1
           ).subscribe((badgeRes) => {
             console.log('Badge added:', badgeRes);
           });

        }

      });

      // this.communityCreated.emit(community);
      this.communityForm.reset();
      this.formComplete = false;
    } else {
      this.formComplete = true;
    }
  }

  onCheckBoxChange(event: any) {
    if (event.target.checked) {
      this.numberChecked++;
    } else {
      this.numberChecked--;
    }
  }

  onFileChange(event: any) {
    this.addContentService.uploadFile(event.target.files[0]);
  }
}
