import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InsideNavComponent } from '../inside-nav/inside-nav.component';
import { ReportPostComponent } from '../report-post/report-post.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileDataService } from '../../services/profile-data.service';
import { User } from '../../types/user.interface';
import { ActivatedRoute } from '@angular/router';
import { PostInterface } from '../../types/postInterface.interface';
import { PostService } from '../../services/post.service';

// import { ReportData } from '../../types/reportData.interface';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, InsideNavComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileDataService: ProfileDataService,
    private postService: PostService
  ) {}

  //report and its toast message
  isReportFormVisible = false;
  // isToastMessageVisible = false;

  //connection modal and its toast message
  isModalVisible = false;
  isToastVisible = false;

  toastMessage = '';

  receiverId: number = 0;
  receiverName: string = '';

  user: User | null = null;

  // userProfileData: User | null = null; // store the profile data
  userProfileData: User | null = null;

  userPosts: PostInterface[] = [];

  connections: any[] = [];
  userId: string | null = null;

  // toastMessage: string = 'Connection Request Sent';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId'); //this gets the userId from the URL
      console.log('UserId from the URL: ' + this.userId);
      // this.loadUserProfile();

      //this calls the service func to fetch data from the database
      if (this.userId) {
        this.loadUserProfile(this.userId);
        // this.loadUserPosts(this.userId);
      }
    });
  }

  //this function fetches data from the profileDataService that we injected
  // and when we get the data, it is stored in userProfileData
  loadUserProfile(userId: string) {
    this.profileDataService
      .getUserProfile(userId) // Fetch the data from the backend
      .subscribe(
        (data) => {
          this.userProfileData = data; // Assign the data to the component
          console.log(data.bio);

          //after the profile is loaded, fetch th euser's posts
          this.loadUserPosts(userId)
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
  }

  //loads the posts
  loadUserPosts(userId: string): void {
    this.postService.getUserPosts(userId).subscribe(
      (posts) => {
        this.userPosts = posts;
        console.log('User Posts:', posts);
      },
      (error) => {
        console.error('Error fetching user posts:', error);
      }
    );
  }

  //function to open the report modal
  openReportPopUp() {
    this.isReportFormVisible = true;
  }

  //function to report post, show the toast message
  reportPost() {
    this.isReportFormVisible = false;
    console.log('reported');
    this.showToast(
      'Thank you for your feedback! We take reports seriously and will review this content shortly.'
    );
  }

  //function to show the toast message after reporting
  showToast(message: string) {
    this.toastMessage = message;
    console.log('reported without message');
    this.isToastVisible = true;

    setTimeout(() => {
      this.isToastVisible = false;
    }, 3000);
    console.log('message works');
  }

  // onSubmit(event: Event) {
  //   event.preventDefault(); //this prevents the default form submission, if you remove it the page reloads automatically and toaast message wont show
  //   this.reportPost();
  //   // this.showToast('Form submitted successfully!');
  // }

  //connection modal opens
  openModal(receiverId: number, receiverName: string): void {
    this.receiverId = receiverId;
    this.receiverName = receiverName;
    this.isModalVisible = true;
  }

  //connection modal closes
  closeModal() {
    this.isModalVisible = false;
  }

  //function to add or connect with a user
  addConnection(): void {
    // this.connectionService.sendConnectionRequest(this.userId, this.receiverId).subscribe(
    //   (response) => {
    //     console.log('Connection request sent');
    //     this.isModalVisible = false; // Close the modal
    //     alert('Connection request sent successfully!');
    //   },
    //   (error) => {
    //     console.error('Error sending connection request', error);
    //     alert('Failed to send connection request.');
    //   }
    // );
  }

  goToBadgesPage() {
    console.log('Going to badges page');
    this.router.navigate(['/badges']);
  }

  //share your profile or get alink to your profile
  copyLinkToProfile() {
    const profileLink = window.location.href;
    navigator.clipboard
      .writeText(profileLink)
      .then(() => {
        console.log('Link copied to clipboard');
        this.showToast('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
        this.showToast('Failed to copy link to clipboard.');
      });
  }
}