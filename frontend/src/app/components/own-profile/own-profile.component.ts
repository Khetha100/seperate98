import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { InsideNavComponent } from '../inside-nav/inside-nav.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProfileDataService } from '../../services/profile-data.service';
import { User } from '../../types/user.interface';
import { BadgesDialogComponent } from '../badges-dialog/badges-dialog.component';
import { Badge, BadgesService } from '../../services/badges.service';
import { PostInterface } from '../../types/postInterface.interface';
import { UserProfileService } from '../../services/userProfile.service';

@Component({
  selector: 'app-own-profile',
  imports: [
    RouterLink,
    NavbarComponent,
    InsideNavComponent,
    CommonModule,
    BadgesDialogComponent,
  ],
  templateUrl: './own-profile.component.html',
  styleUrl: './own-profile.component.css',
})
export class OwnProfileComponent implements OnInit {
  user: User | null = null;
  connections: any[] = [];
  userProfileData: User | null = null;
  userId: string | null = null;
  isToastMessageVisible = false;
  toastMessage: string = '';
  loading = false;
  showBadgesDialog = false;
  earnedBadges: Badge[] | undefined;
  badge!: Badge | null;
  userBadge!: Badge | null;
  loggedInUser: User | null = null;

  firstName: string = '';
  lastName: string = '';
  imageUrl: string = '';
  bio: string = '';
  phone: string = '';
  grade: string = '';
  subjects: string[] = [];

  loggedInUserInfo: any = localStorage.getItem('loggedInUserInfo') || {};

  posts: PostInterface[] = [];

  // userPosts: Post[] = [];

  // posts: Post[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileDataService: ProfileDataService,
    private badgesService: BadgesService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    
    if (this.userId) {
      this.loadOwnProfile();
    }
    
    if (this.loggedInUserInfo) {
      this.loggedInUserInfo = JSON.parse(this.loggedInUserInfo);
      
      console.log('first',this.imageUrl)
      // Assign user details from localStorage to component properties
      this.firstName = this.loggedInUserInfo.firstName || '';
      this.lastName = this.loggedInUserInfo.lastName || '';
      this.bio = this.loggedInUserInfo.bio || '';
      this.imageUrl = this.loggedInUserInfo.imageUrl || '';
      this.phone = this.loggedInUserInfo.phone || '';
      this.grade = this.loggedInUserInfo.grade || '';
      this.subjects = this.loggedInUserInfo.subjects || [];
    }
    
    
    
    //get the ID from Auth
    // this.authService.getUserId().subscribe((id: string) => { //check with maboku bc in the auth he passed a number
    //   this.userId = id;
    //   if (this.userId) {
      //     this.loadOwnProfile(this.userId); // this converts the ID to a number, i did this bc it keeps givign me an error
      //   }
      // });
      
      //this is for when we fetch th euser profile in the backend but it should not be here since we are storing the data in locastorage
      // this.authService
      //   .getUserById(this.authService.clickedUserId)
      //   .subscribe((res) => {
        //     // console.log('USER DATA FROM DATABASE');
        //     console.log(res);
        //     this.userProfileData = res;
        //   });
        // this.loadUserBadge();
      }
      
      loadOwnProfile(): void {
        const storedUser = localStorage.getItem('loggedInUserInfo');

        if (storedUser) {
      this.loggedInUserInfo = JSON.parse(storedUser);
    }

    // Fetch fresh data from the backend bc it i supdated there too
    this.profileDataService.getOwnProfile(this.userId!).subscribe(
      (data) => {
        console.log('Updated profile:', data);
        this.loggedInUserInfo = data;
        

        localStorage.setItem('loggedInUserInfo', JSON.stringify(data));
      },
      (error) => {
        console.error('Error fetching updated profile:', error);
      }
    );

    this.profileDataService.getAllPostsOnUsersProfile(this.userId).subscribe(
      (posts) => {
        console.log('posts fetched', posts);
        this.loggedInUserInfo.posts = posts;
      },
      (error) => {
        console.log('error fetching posts', error);
      }
    )
  }

  // loadOwnProfile(userId: string): void {
  //   // this.loading= true;
  //   // this.profileDataService.getOwnProfile(userId).subscribe(
  //     this.authService.getUserById(Number(userId)).subscribe(
  //     (data) => {
  //       this.userProfileData = data;
  //       // this.loading = false;
  //     },
  //     (error) => {
  //       console.error('Error fetching posts', error);
  //       this.loading = false;
  //     }
  //   );
  // }

  // loadPostsForUser(userId: number): void {
  //   this.userProfileService.getPostsByUser(userId).subscribe(posts => {
  //     this.userProfileData!.posts = posts;  // Add posts to the userProfileData
  //   }, error => {
  //     console.error('Error fetching posts:', error);
  //   });
  // }

  // updateProfile(): void {
  //   if (this.loggedInUser && this.loggedInUser.id !== undefined) {
  //     const updatedProfile = {
  //       ...this.loggedInUser,
  //       firstName: this.firstName,
  //       lastName: this.lastName,
  //       bio: this.bio,
  //       phone: this.phone,
  //       grade: this.grade,
  //       subjects: this.subjects,
  //       imageUrl: this.imageUrl,
  //       role: this.loggedInUser.role,
  //     };

  //     this.editProfileService
  //       .updateUserProfile(this.loggedInUser.id.toString(), updatedProfile)
  //       .subscribe(
  //         (response) => {
  //           if (response.success) {
  //             // Update localStorage with new data

  //             this.loggedInUser = { ...this.loggedInUser, ...updatedProfile };
  //             this.userService.setUser(this.loggedInUser);
  //             console.log('Profile Updated Successfully');

  //             this.toastMessage = 'Profile updated successfully';
  //             this.isToastMessageVisible = true;
  //           }
  //         },
  //         (error) => {
  //           this.toastMessage = 'Failed to update profile';
  //           this.isToastMessageVisible = true;
  //         }
  //       );
  //   }
  // }

  // loadOwnProfile(userId: string): void {
  //   this.loading = true; // Start loading

  //   this.authService.getUserById(Number(userId)).subscribe({
  //     next: (data) => {
  //       this.user = data;
  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching own profile:', error);
  //       this.loading = false;
  //     },
  //   });
  // }

  // if (!userId) {
  //   console.error('Invalid user ID provided.');
  //   return;
  // }
  // // this.loading= true;
  // // this.profileDataService.getOwnProfile(userId).subscribe(
  //   this.authService.getUserById(Number(userId)).subscribe(
  //   (data) => {
  //     // this.userProfileData = data;
  //     this.loading = false;
  //   },
  //   (error) => {
  //     console.error('Error fetching own profile:', error);
  //     // this.loading = false;
  //   }
  // );

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

  showToast(message: string) {
    this.toastMessage = message;
    console.log('Link copied.');
    this.isToastMessageVisible = true;

    setTimeout(() => {
      this.isToastMessageVisible = false;
    }, 3000);
    console.log('link workssss');
  }

  goToCommunities() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/allCommunities']);
    }, 2000);
  }

  private loadUserBadge() {
    const userId = localStorage.getItem('id');
    if (!userId) return;

    this.badgesService.getUserBadge(Number(userId)).subscribe({
      next: (badge) => {
        this.badge = badge;
      },
      error: (error) => {
        console.error('Error loading badge:', error);
      },
    });
  }
  openBadgesDialog() {
    this.showBadgesDialog = true;
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  }

  closeBadgesDialog() {
    this.showBadgesDialog = false;
    // Re-enable background scrolling
    document.body.style.overflow = '';
  }
}