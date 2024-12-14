import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessAuthGuard } from '@gintaa/core/guards/business-auth.guard';
import { BusinessProfileComponent } from './components/business/business-profile/business-profile.component';
import { BusinessComponent } from './components/business/business.component';
import { MyBusinessComponent } from './components/business/my-business/my-business.component';
import { MemberProfileViewComponent } from './components/business/member-profile-view/member-profile-view.component';
import { BusinessOffersComponent } from './components/business/business-offers/business-offers.component';

const routes: Routes = [
  { path: '', component: BusinessComponent, canActivate: [BusinessAuthGuard], pathMatch: 'full' },
  { path: 'profile', component: BusinessOffersComponent, canActivate: [BusinessAuthGuard], pathMatch: 'full' },
  { path: ':businessSlug', component: BusinessOffersComponent },
  { path: 'view/:id', component: BusinessProfileComponent, canActivate: [BusinessAuthGuard], pathMatch: 'full' },
  { path: 'view/:id/teams', component: MyBusinessComponent, canActivate: [BusinessAuthGuard], pathMatch: 'full' },
  { path: 'view/:id/teams/:memberId', component: MemberProfileViewComponent, canActivate: [BusinessAuthGuard], pathMatch: 'full' }

  // { path: '', component: BusinessComponent },
  // { path: ':businessSlug', component: BusinessOffersComponent },
  // { path: 'view/:id', component: BusinessProfileComponent },
  // { path: 'view/:id/teams', component: MyBusinessComponent },
  // { path: 'view/:id/teams/:memberId', component: MemberProfileViewComponent},
  // { path: 'profile', component: BusinessOffersComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BusinessRoutingModule { }
