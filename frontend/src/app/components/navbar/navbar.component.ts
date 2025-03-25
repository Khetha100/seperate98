import { AuthService } from './../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PostInterface } from '../../types/postInterface.interface';
import { PostService } from '../../services/post.service';
import { AddContentService } from '../../services/add-content.service';
import * as uuid from 'uuid';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isPopupVisible: boolean = false;

  router: any;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    public addContentService: AddContentService,
    public authService:AuthService,
    public homeService: HomeService
  ) {
    this.postForm = this.formBuilder.group({
      postContent: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.addContentService.uuidValue = `${uuid.v4().toLowerCase()}`;
    // this.postService.getPosts().subscribe((data) => {
    //   console.log(data);
    //   this.posts = data;
    // });
    this.homeService.getRandomPosts().subscribe((posts) => {
      console.log(posts);
      this.posts = posts;
    })
  }
  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }
  closePopup() {
    this.isPopupVisible = false;
  }
  postForm: FormGroup;

  // posts: String[] = [];
  posts: PostInterface[] = [];
  picUrl: string = '';

  // userName: string = 'Sino Fipaza';

  postContent: string = '';

  likes: number = 0;

  comments: number = 0;

  submit() {
    if (this.authService.userData.id != undefined) {
      

      const postInterface: PostInterface = {
        imageUrl: this.addContentService.communityPicture,
        name: 'Sino Fipaza',
        description: this.postForm.value.postContent,
        postLikes: [],
        date: new Date(),
        userInfoId: this.authService.userData.id,
      };
      console.log(this.postForm.value.postContent);
      this.posts.unshift(this.postForm.value.postContent);
      this.postService.addPost(postInterface).subscribe((data) => {
        console.log(data);
      });
      const newPost = this.postForm.value.postContent?.trim();

      if (!newPost) {
        alert('Please enter some content before posting!');
        return;
      }
      this.postForm.reset();
      
    }
  }
  // previewUrl: string | null = null;
  onFileChange(event: any) {
    this.addContentService.uploadFile(event.target.files[0]);
  }
}
