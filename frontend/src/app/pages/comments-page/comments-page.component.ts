import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportPostComponent } from '../../components/report-post/report-post.component';
import { CommentsService } from '../../services/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddContentService } from '../../services/add-content.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as uuid from 'uuid';
import { CommentsInterface } from '../../types/comments.interface';
import { User } from '../../types/user.interface';
import { AuthService } from '../../services/auth.service';
import { PostInterface } from '../../types/postInterface.interface';
import { PostService } from '../../services/post.service';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-comments-page',
  imports: [CommonModule, RouterLink, ReportPostComponent, ReactiveFormsModule, DeleteModalComponent],
  templateUrl: './comments-page.component.html',
  styleUrl: './comments-page.component.css',
})
export class CommentsPageComponent {
  commentForm: FormGroup;
  item: PostInterface = {
    imageUrl: '',
    name: '',
    description: '',
    date: new Date(),
    userInfoId: 0
  }

  constructor(
    private formBuilder: FormBuilder,
    public commentsService: CommentsService,
    private addContentService: AddContentService,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    public postService: PostService
  ) {
    this.commentForm = this.formBuilder.group({
      commentContent: [''],
    });
  }
  comment: CommentsInterface[] = [];
  ngOnInit(): void {
    this.item = this.commentsService.clickedCommentPost;
    this.addContentService.uuidValue = `${uuid.v4().toLowerCase()}`;
    if(this.item.id){
      this.commentsService.getComments(this.item.id).subscribe((data) => {
        console.log(data);
        this.comment = data;
      });
    }

    this.authService.getUserById(Number(localStorage.getItem('id'))).subscribe((user) => {
      console.log(user);
      this.authService.userData = user;
    });
  }

  // userId!: number;
  receiverId: number = 0;
  receiverName: string = "";

  user: User | null = null;

  userProfileData: any = null;

  isIconActive: boolean = false;
  location: any;

  toggleIcon(): void {
    this.isIconActive = !this.isIconActive;
  }
  commentIcon: string = 'icons/comment.svg';
  postedComments: number = 0;
  // comments: string[] = [];

  PostComment(newComment: string) {
    // if (newComment.trim() !== "") {

    this.postedComments++;
    // console.log("new comment");
    // }

    if (this.commentsService.clickedCommentPost.id) {
      const commentsInterface: CommentsInterface = {
        // id: number,
        name: this.authService.userData.firstName +
          ' ' + this.authService.userData.lastName,
        postId: this.commentsService.clickedCommentPost.id,
        userId: Number(localStorage.getItem('id')),
        description: newComment,
        numberOfLikes: 0,
        date: new Date(),
      };

      // this.comment.push(commentsInterface);
      this.commentsService.addComments(commentsInterface).subscribe((data) => {
        console.log(data);
        this.comment.unshift(data);
      });
    }
  }

  icon: string = 'icons/heart.svg';
  icon2: string = 'icons/likedHeart.svg';
  clickedPicture: boolean = false;
  likeCount: number = 0;
  OnClick() {
    this.clickedPicture = !this.clickedPicture;
    this.icon = this.clickedPicture ? this.icon2 : 'icons/heart.svg';

    if (this.clickedPicture) {
      this.likeCount++;
    } else {
      this.likeCount--;
    }
  }

  // goBack() {
  //   this.location.back()
  // }
}
