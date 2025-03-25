import { AddContentService } from './../../services/add-content.service';
import { WebSocketService } from './../../services/web-socket-service.service';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { communityMessage } from '../../types/communityMessage.interface';
import { CommonModule } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiService } from '../../services/emoji.service';
import { CommunityDiscussion } from '../../types/communityDiscussion.interface';
import { CommunityDiscussionsService } from '../../services/community-discussions.service';
import { CommunityService } from '../../services/community.service';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';
import { CommunityMessageService } from '../../services/community-message.service';

@Component({
  selector: 'app-community-discussion',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    PickerModule,
  ],
  templateUrl: './community-discussion.component.html',
  styleUrl: './community-discussion.component.css',
})
export class CommunityDiscussionComponent implements OnInit {
  discussionForm: FormGroup;
  discussions: CommunityDiscussion[] = [];
  messages: communityMessage[] = [];
  loggedInUser: number = Number(localStorage.getItem('id'));


  userInfoId:number = 0;

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private communityDiscussionsService: CommunityDiscussionsService,
    private webSocketService: WebSocketService,
    public emojiService: EmojiService,
    private communityService: CommunityService,
    public searchService: SearchService,
    public router: Router,
    private authService: AuthService,
    private communityMessage: CommunityMessageService,
    private addContentService:AddContentService
  ) {
    this.discussionForm = this.fb.group({
      title: ['', [Validators.required, Validators.max(255)]],

      description: ['', [Validators.required, Validators.max(800)]],
    });
  }
  ngOnInit(): void {
    console.log("On NgOnit");
    console.log(this.communityDiscussionsService.clickedDiscussion.id);
    if (
      this.communityDiscussionsService.clickedDiscussion.id != undefined ||
      this.communityService.communityClickedId != 0
    ) {
      this.communityDiscussionsService.allPrevious().subscribe((response) =>
        
        response.forEach((message) => {
          if (!this.messages.includes(message)) {
            this.messages.push(message);
          }
        },
        console.log(response))
        
      );

      this.authService.authState$.subscribe((res) => {
        if(res?.id){
          this.userInfoId = res?.id
        }
        
      }),

      this.webSocketService.initializeConnection();
      this.webSocketService.listen((message: communityMessage) => {
        this.messages.push(message);
      }, this.communityDiscussionsService.clickedChannel);
    } else {
      alert('Please select a community and discussion before chatting');
      this.router.navigate(['/community']);
    }

    

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
      userInfoId: this.userInfoId
    };
    
    
    console.log(this.discussionForm.value);
    this.discussions.unshift(communityDiscussion);

    this.communityDiscussionsService
      .createCommunityDiscussion(communityDiscussion)
      .subscribe((res) => {
        console.log(res);
      });
      
  }

  add(name: string): void {
    if (localStorage.getItem('id')) {
      const message: communityMessage = {
        senderId: Number(localStorage.getItem('id')),
        content: name,
        date:new Date(),
        discussion: this.communityDiscussionsService.clickedDiscussion,
        communityId: this.communityService.communityClickedId,
        subscriptionChannel: this.communityDiscussionsService.clickedChannel,
      };
      console.log(name);
      this.webSocketService.send(message);
    } else {
      console.log(
        'You are not logged in thus cannot send messages on a community'
      );
    }
  }

  click(): void {
    console.log(this.form.value.name);
    console.log(this.form.value.days);
    this.add(this.form.value.name);
    this.form.reset();
  }

  deleteMessageClicked(clickedMessageId?: number): void {
    console.log("About to delete a message with id: "+ clickedMessageId);
    if (clickedMessageId) {
      this.communityMessage.deleteMessage(clickedMessageId).subscribe((res) => {
        console.log(res);
      });
    }
  }

  autoGrowTextArea(event: any) {
    const textarea = event.target;
    textarea.style.height = '40px';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  search() {}

  onFileChange(event: any) {
    this.addContentService.uploadFile(event.target.files[0]);
  }
}
