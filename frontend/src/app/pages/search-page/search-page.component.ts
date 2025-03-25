import { searchInterface } from './../../types/search.interface';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule, Location } from '@angular/common';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { PostInterface } from '../../types/postInterface.interface';
import { ReportPostComponent } from '../../components/report-post/report-post.component';
import { OwnProfileComponent } from '../../components/own-profile/own-profile.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NavbarComponent, FormsModule,CommonModule, ReactiveFormsModule, ReportPostComponent, RouterLink],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private searchService: SearchService,
    public authService: AuthService,
  ) {
    this.searchForm = this.formBuilder.group({
      postContent: [''],
    });
  }

  image: string = 'images/hashtagPic.png';

  image1: string = 'images/hashtagPic.png';

  image2: string = 'images/noResult.png';

  searchResults: string = '';

  results: PostInterface[] = [];

  text: string = '';

  searchFunct() {
    console.log(this.searchForm.value.postContent);
    const searchObj: searchInterface = {
      user: '',
      post: this.searchForm.value.postContent,
      communityTitle: '',
      communityDescription: ' ',
    };
    this.results.splice(0, this.results.length);
    this.searchService.searchPosts(searchObj).subscribe((response) => {
      this.results = response;
      console.log(response);
    });

    if (this.searchResults.length == 0) {
      this.image = this.image2;
      this.text = 'Sorry, no results found';
    }
  }

  // searchIcon: string = "icons/searchIcon.svg";
  //   checkInput() {
  //   if (this.searchIcon.length == 0) {
  //     alert('Please type something');
  //   }
  // }

  goBack() {
    this.location.back();
  }
}
