import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommunityDiscussion } from '../../types/communityDiscussion.interface';
import { InsideNavComponent } from '../inside-nav/inside-nav.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommunityDiscussionsService } from './../../services/community-discussions.service';
import { CommunityService } from '../../services/community.service';
import { Notifications } from '../../types/notification.interface';
import { User } from '../../types/user.interface';
import { AuthService } from '../../services/auth.service';
import { AddContentService } from '../../services/add-content.service';
import { ReportModalComponent } from "../report-modal/report-modal.component";

@Component({
  selector: 'app-community-discussions',
  imports: [
    InsideNavComponent,
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule,
    ReportModalComponent,
  ],
  templateUrl: './community-discussions.component.html',
  styleUrl: './community-discussions.component.css',
})
export class CommunityDiscussionsComponent implements OnInit {
  discussionForm: FormGroup;
  discussions: CommunityDiscussion[] = [];

  startedDiscussionUser: User | null = null;

  name: string = '';
  surname: string = '';

  userInfoId: number = 0;

  constructor(
    private fb: FormBuilder,
    public communityDiscussionsService: CommunityDiscussionsService,
    private communityService: CommunityService,
    public searchService: SearchService,
    private authService: AuthService,
    public addContentService: AddContentService
  ) {
    this.discussionForm = this.fb.group({
      title: ['', [Validators.required, Validators.max(255)]],

      description: ['', [Validators.required, Validators.max(800)]],
    });
  }
  ngOnInit(): void {
    this.addContentService.uuidValue = `${uuid.v4().toLowerCase()}`;
    this.authService.authState$.subscribe((res) => {
      if (res?.id) {
        this.userInfoId = res?.id;
      }
    });
    this.communityDiscussionsService.getAllDiscussions().subscribe((res) => {
      console.log(res);
      res.forEach((element) => {
        this.discussions.unshift(element);
      });
    });
  }

  onSubmitDiscussionForm() {
    const communityDiscussion: CommunityDiscussion = {
      title: this.discussionForm.value.title,
      description: this.discussionForm.value.description,
      communityId: this.communityService.communityClickedId,
      subscriptionChannel:
        '' +
        this.discussions.length +
        1 +
        '/' +
        this.discussionForm.value.title,
      userInfoId: Number(localStorage.getItem('id')),
    };

    this.discussionForm.reset();

    this.communityDiscussionsService
      .createCommunityDiscussion(communityDiscussion)
      .subscribe((res) => {
        console.log('Discussion created: ', res);

        this.discussions.unshift(res); // or adjust according to the response structure
      });
  }

  clickedDiscussion(discussion: CommunityDiscussion, channel: string) {
    console.log('CLICKED DISCUSSION IS: ');
    console.log(discussion);

    this.communityDiscussionsService.setClickedDiscussionId(discussion);
    this.communityDiscussionsService.setClickedChannel(channel);
  }

  // onDeleteDiscussion(discussionId?: number) {
  //   if (discussionId) {
  //         this.communityDiscussionsService
  //           .deleteDiscussionService(discussionId)
  //           .subscribe((res) => {
  //             console.log(res);
  //           });
  //   }

  // }

  // onDeleteDiscussion(discussionId?: number) {
  //   if (discussionId) {
  //     this.communityDiscussionsService
  //       .deleteDiscussionService(discussionId)
  //       .subscribe((res) => {
  //         console.log(res);
  //         this.discussions = this.discussions.filter(
  //           (d) => d.id !== discussionId
  //         );
  //       });
  //   }
  // }

  onDeleteDiscussion(discussionId?: number) {
    if (discussionId) {
      this.communityDiscussionsService
        .deleteDiscussionService(discussionId)
        .subscribe((res) => {
          console.log('Discussion deleted: ', res);

          // Remove the discussion from the frontend list by filtering it out
          this.discussions = this.discussions.filter(
            (discussion) => discussion.id !== discussionId
          );
        });
    }
  }

  checkIfDiscussionCreator(startedDiscussionId?: number) {
    return startedDiscussionId === Number(localStorage.getItem('id'));
  }

  onFileChange(event: any) {
    this.addContentService.uploadFile(event.target.files[0]);
  }
}
