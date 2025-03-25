import { ReportService } from './../../services/report.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HamburgerComponent } from '../../components/hamburger/hamburger.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostService } from '../../services/post.service';
import { PostInterface } from '../../types/postInterface.interface';
import { AddContentService } from '../../services/add-content.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import * as uuid from 'uuid';
import { ReportPostComponent } from '../../components/report-post/report-post.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentsService } from '../../services/comments.service';
import { CommentsInterface } from '../../types/comments.interface';
import { User } from '../../types/user.interface';
import { AuthService } from '../../services/auth.service';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    HamburgerComponent,
    NavbarComponent,
    NgIf,
    ReportPostComponent,
    MatSnackBarModule,
    CommonModule,
    DeleteModalComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  postForm: FormGroup;


  // addContentService:AddContentService;

  constructor(
    private formBuilder: FormBuilder,
    public postService: PostService,
    private addContentService: AddContentService,
    private snackBar: MatSnackBar,
    public comments: CommentsService,
    public reportService: ReportService,
    public authService: AuthService) {
    this.postForm = this.formBuilder.group({
      postContent: [''],
    });
  }
  ngOnInit(): void {
    this.addContentService.uuidValue = `${uuid.v4().toLowerCase()}`;
    this.postService.getPosts().subscribe((data) => {
      console.log(data);
      this.postService.posts = data;

    });

    this.postService.loggedUserId = Number(localStorage.getItem('id'))
    // if(localStorage.getItem('id')){
    this.authService.getUserById(Number(localStorage.getItem('id'))).subscribe((user) => {
      console.log(user);
      this.authService.userData = user;
    });
    console.log(this.authService.userData.imageUrl)
    // }

  }
  // userId!: number;
  receiverId: number = 0;
  receiverName: string = "";

  user: User | null = null;

  userProfileData: any = null;




  // userName: string = 'Sino Fipaza';

  postContent: string = '';

  // user!: User;

  likes: number = 0;

  submit() {
    const newPost = this.postForm.value.postContent?.trim();

    if (!newPost) {
      alert('Please enter some content before posting!');
      return;
    }
    if (this.authService.userData.id != undefined) {
      const postInterface = {
        imageUrl: this.addContentService.postPicture,
        name:
          this.authService.userData.firstName +
          ' ' +
          this.authService.userData.lastName,
        userId: this.authService.userData.id,
        description: newPost,
        postLikes: [],
        date: new Date(),
        userInfoId: this.authService.userData.id
      };

      this.postService.addPost(postInterface).subscribe(
        (data) => {
          console.log('Post submitted:', data);
          this.postService.posts.unshift(data);

          this.snackBar.open('Post submitted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });

          this.postForm.reset();
          this.previewUrl = null;
        },
        (error) => {
          console.error('Error submitting post:', error);

          this.snackBar.open('Failed to submit post. Try again.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
  previewUrl: string | null = null;
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.addContentService.uploadFilePost(event.target.files[0]);
    }
  }

  icon: string = 'icons/heart.svg';
  icon2: string = 'icons/likedHeart.svg';
  clickedPicture: boolean = false;
  likeCount: number = 0;



  OnClick() {
    this.clickedPicture = !this.clickedPicture;
    this.icon = this.clickedPicture ? this.icon2 : 'icons/heart.svg';
    this.likeCount += this.clickedPicture ? 1 : -1;
    if (this.comments.clickedCommentPost.id) {


      const commentUpdate: CommentsInterface = {
        name: '',
        postId: this.comments.clickedCommentPost.id,
        userId: Number(localStorage.getItem('id')),
        description: 'Liked your post!',
        numberOfLikes: this.likeCount,
        date: new Date(),
      };
      this.comments.putLikes(commentUpdate).subscribe((data) => {
        console.log(data);
      });
    }
  }
  getTimDiff(time: Date): string {

    const currentTimeInSA = new Date();
    currentTimeInSA.setHours(currentTimeInSA.getHours() - 2);

    const diffTime = Math.abs(new Date(time).getTime() - currentTimeInSA.getTime());

    const timeDiffInMinutes = Math.ceil(diffTime / (1000 * 60));
    const timeDiffInHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const timeDiffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (timeDiffInMinutes < 60) {
      return timeDiffInMinutes + 'm';
    }
    else if (timeDiffInHours < 24) {
      return timeDiffInHours + 'h';
    }
    else {
      return timeDiffInDays + 'd';
    }
  }


}
