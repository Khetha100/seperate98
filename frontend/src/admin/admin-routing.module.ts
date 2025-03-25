import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { AdminSignInComponent } from './components/admin-sign-in/admin-sign-in.component';
import { AdminSignUpComponent } from './components/admin-sign-up/admin-sign-up.component';
import { ContentComponent } from './components/content/content.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { RouterModule, Routes } from '@angular/router';
import { DonationsComponent } from './components/donations/donations.component';
import { UserComponent } from './components/user/user.component';



const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'signIn', component: AdminSignInComponent },
  { path: 'signUp', component: AdminSignUpComponent },
  { path: 'user', component: UserComponent },
  { path: 'content', component: ContentComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'donations', component: DonationsComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
