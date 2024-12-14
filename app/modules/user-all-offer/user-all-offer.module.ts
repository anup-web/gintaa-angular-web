import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { OfferCardDefaultModule } from '@gintaa/shared/components/offer-card-default/offer-card-default.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserAllOfferComponent } from './user-all-offer.component';

@NgModule({
  declarations: [
    UserAllOfferComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    OfferCardDefaultModule,
    BreadCrumbModule,
    RouterModule.forChild([
      { 
          path: '', 
          component: UserAllOfferComponent
      }
    ]),
  ],
  exports: [
    UserAllOfferComponent
  ]
})
export class UserAllOfferModule { }
