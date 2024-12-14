import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from '@gintaa/core/guards/logged-in.guard';
import { EmptyOfferCartAnimationModule } from '@gintaa/shared/components/animations/empty-offer-cart-animation/empty-offer-cart-animation.module';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { FloatingListingModule } from '@gintaa/shared/components/floating-listing/floating-listing.module';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
import { OfferCardDefaultModule } from '@gintaa/shared/components/offer-card-default/offer-card-default.module';
import { OffersListViewModule } from '@gintaa/shared/components/offers-list-view/offer-list-view.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MyOfferListComponent } from './components/my-offers/my-offer-list/my-offer-list.component';
import { MyOfferSearchComponent } from './components/my-offers/my-offer-search/my-offer-search.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { MyOfferResolverService } from './services/my-offer.resolver.service';
import { MyOffersEffects } from './store/my-offer.effects';
import { myOfferReducer } from './store/my-offer.reducer';

@NgModule({
  declarations: [
    MyOffersComponent,
    MyOfferSearchComponent,
    MyOfferListComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyOffersComponent,
        canActivate: [LoggedInGuard],
        resolve: { myOfferData: MyOfferResolverService },
      }
    ]),
    StoreModule.forFeature('myOffers', myOfferReducer),
    EffectsModule.forFeature([MyOffersEffects]),
    InfiniteScrollModule,
    BreadCrumbModule,
    FloatingMenuModule,
    FloatingListingModule,
    EmptyOfferCartAnimationModule,
    OffersListViewModule,
    OfferCardDefaultModule,
  ],
})
export class MyOffersModule { }
