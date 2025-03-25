import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditOwnProfileComponent } from './components/edit-own-profile/edit-own-profile.component';
import { OwnProfileComponent } from './components/own-profile/own-profile.component';
import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { AllCommunitiesComponent } from './components/all-communities/all-communities.component';
import { CommunityComponent } from './components/community/community.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SplashPageComponent } from './pages/splash-page/splash-page.component';
import { Welcomepage1Component } from './pages/welcomepage1/welcomepage1.component';
import { Welcomepage2Component } from './pages/welcomepage2/welcomepage2.component';
import { InfoNavComponent } from './components/info-nav/info-nav.component';
import { DonationPageComponent } from './components/donation-page/donation-page.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NewCommunityComponent } from './components/new-community/new-community.component';
import { CommentsPageComponent } from './pages/comments-page/comments-page.component';
// import { SigninComponent } from './components/signin/signin.component';
import { SigninComponent } from './components/signin/signin.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AboutYouQuestionsComponent } from './components/about-you-questions/about-you-questions.component';
import { MyCommunitiesComponent } from './components/my-communities/my-communities.component';
import { InsideCommunitiesComponent } from './components/inside-communities/inside-communities.component';
import { CommunityDiscussionsComponent } from './components/community-discussions/community-discussions.component';
import { CommunityDiscussionComponent } from './components/community-discussion/community-discussion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { BadgesDialogComponent } from './components/badges-dialog/badges-dialog.component';

export const routes: Routes = [
  {
    path: 'community',
    component: CommunityComponent,
  },
  {
    path: 'communityCreate',
    component: CreateCommunityComponent,
  },
  {
    path: 'allCommunities',
    component: AllCommunitiesComponent,
  },
  { path: 'myCommunity', component: MyCommunitiesComponent },
  {
    path: 'communityDiscussion',
    component: CommunityDiscussionComponent,
  },
  {
    path: 'home',
    component: HomePageComponent,
  },

  {
    path: 'passwordReset',
    component: PasswordResetComponent,
  },
  {
    path: 'newCommunity',
    component: NewCommunityComponent,
  },

  {
    path: 'profile',
    component: OwnProfileComponent,
  },
  { path: 'about-you', component: AboutYouQuestionsComponent },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
  },
  {
    path: '',
    component: SplashPageComponent,
  },
  {
    path: 'infoNav',
    component: InfoNavComponent,
  },
  {
    path: 'welcome1',
    component: Welcomepage1Component,
  },
  {
    path: 'welcome2',
    component: Welcomepage2Component,
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
  },
  {
    path: 'community',
    component: CommunityComponent,
  },

  {
    path: 'allCommunities',
    component: AllCommunitiesComponent,
  },
  {
    path: 'communityDiscussion',
    component: CommunityDiscussionsComponent,
  },
  {
    path: 'policy',
    component: PolicyComponent,
  },
  {
    path: 'donationPage',
    component: DonationPageComponent,
  },
  {
    path: 'ham',
    component: HamburgerComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  // {
  //   path: 'profile/:id',
  //   component: UserProfileComponent,
  // },
  // {
  //   path: 'about-you',
  //   component: AboutYouQuestionsComponent,
  // },
  // {
  //   path: 'account/setup',
  //   component: ProfileManagementComponent,
  // },
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
  },

  
  // { path: '', component: AppComponent },
  {
    path: 'profile/edit',
    component: EditOwnProfileComponent,
  },
  {
    path: 'profile',
    component: OwnProfileComponent,
  },
  // {
  //   path: 'user/profile/:userId', // Viewing another user's profile
  //   component: UserProfileComponent,
  // },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'insideCommunities', component: InsideCommunitiesComponent },
  { path: 'communityDiscussions', component: CommunityDiscussionsComponent },
  { path: 'comments', component: CommentsPageComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'badgePopUp', component: BadgesDialogComponent}
];
