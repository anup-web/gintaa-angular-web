import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { EditUserProfileComponent } from './components/profile/edit-user-profile/edit-user-profile.component';
import { OtherUserProfileComponent } from '@gintaa/modules/profile/components/profile/other-user-profile/other-user-profile.component';
import { AllUserCommentsComponent } from '@gintaa/modules/profile/components/profile/all-user-comments/all-user-comments.component';
import { OtherUserAllOfferComponent } from './components/profile/other-user-profile/other-user-all-offer/other-user-all-offer.component';
import { BusinessInvitationsComponent } from './components/business-invitations/business-invitations.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'edit', component: EditUserProfileComponent },
  { path: ':userId/view', component: OtherUserProfileComponent },
  { path: ':userId/feedback', component: AllUserCommentsComponent },
  { path: ':userId/offers', component: OtherUserAllOfferComponent },
  { path: ':userId/offers', component: OtherUserAllOfferComponent },
  { path: 'business-invitations', component: BusinessInvitationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
