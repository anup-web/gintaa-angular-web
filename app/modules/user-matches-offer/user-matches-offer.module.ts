import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyCartAnimationModule } from '@gintaa/shared/components/animations/empty-cart-animation/empty-cart-animation.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { LoadingSpinnerModule } from '@gintaa/shared/components/loader/loader.module';
import { OfferCardDefaultModule } from '@gintaa/shared/components/offer-card-default/offer-card-default.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { UserMatchesOfferComponent } from './user-matches-offer.component';

@NgModule({
  declarations: [
    UserMatchesOfferComponent
  ],
  imports: [
    CommonModule,
    EmptyCartAnimationModule,
    OfferCardDefaultModule,
    BreadCrumbModule,
    LoadingSpinnerModule,
    PipesModule,
    RouterModule.forChild([
      { 
          path: '', 
          component: UserMatchesOfferComponent
      }
    ]),
  ],
  exports: [
    UserMatchesOfferComponent
  ]
})
export class UserMatchesOfferModule { }
