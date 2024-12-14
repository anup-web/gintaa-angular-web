import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReferRewardAddComponent } from '@gintaa/shared/components/animations/refer-reward-add/refer-reward-add.component';
import { BreadCrumbModule } from '@gintaa/shared/components/bread-crumb/bread-crumb.module';
import { FloatingListingModule } from '@gintaa/shared/components/floating-listing/floating-listing.module';
import { FloatingMenuModule } from '@gintaa/shared/components/floating-menu/floating-menu.module';
import { GridViewModule } from '@gintaa/shared/components/grid-view/grid-view.module';
import { OfferCardDefaultModule } from '@gintaa/shared/components/offer-card-default/offer-card-default.module';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

// general store
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeDataService } from './services/home-data.service';
import { HomeEntityService } from './services/home-entity.service';
import { UtilityEffects } from './store/utility.effects';
import { utilityReducer } from './store/utility.reducer';
import { HomeAuctionsComponent } from './web-home/home-auctions/home-auctions.component';
import { HomeSection1Component } from './web-home/home-section1/home-section1.component';
import { HomeSection2Component } from './web-home/home-section2/home-section2.component';
import { HomeSection3Component } from './web-home/home-section3/home-section3.component';
import { HomeSection4Component } from './web-home/home-section4/home-section4.component';
import { HomeSection5Component } from './web-home/home-section5/home-section5.component';
import { ShowAllComponent } from './web-home/show-all/show-all.component';
import { WebHomeComponent } from './web-home/web-home.component';
import { WebhomeBannerComponent } from './web-home/webhome-banner/webhome-banner.component';
import { AllCategoriesComponent } from './web-home/webhome-categories/all-categories/all-categories.component';
import { MyOffersMatchesComponent } from './web-home/webhome-categories/my-offers-matches/my-offers-matches.component';
import { ProductsCategoriesComponent } from './web-home/webhome-categories/products-categories/products-categories.component';
import { ServicesCategoriesComponent } from './web-home/webhome-categories/services-categories/services-categories.component';
import { WebhomeCategoriesComponent } from './web-home/webhome-categories/webhome-categories.component';
import { AuthMatchOffersComponent } from './web-home/webhome-match-box/auth-match-offers/auth-match-offers.component';
import { UnauthMatchOffersComponent } from './web-home/webhome-match-box/unauth-match-offers/unauth-match-offers.component';
import { WebhomeMatchBoxComponent } from './web-home/webhome-match-box/webhome-match-box.component';
import { WebhomeRecentOffersComponent } from './web-home/webhome-recent-offers/webhome-recent-offers.component';
import { WebhomeRecommendedOffersComponent } from './web-home/webhome-recommended-offers/webhome-recommended-offers.component';
import { WebhomeViewedOffersComponent } from './web-home/webhome-viewed-offers/webhome-viewed-offers.component';


const entityMetadata: EntityMetadataMap = {
  AllOffers: {
    selectId: (offer: any) => offer.offerId,
    entityDispatcherOptions: {
      // optimisticUpdate: true
    }
  }
};

@NgModule({
  declarations: [
    WebHomeComponent,
    WebhomeBannerComponent,
    WebhomeCategoriesComponent,
    WebhomeRecommendedOffersComponent,
    WebhomeViewedOffersComponent,
    WebhomeMatchBoxComponent,
    WebhomeRecentOffersComponent,
    UnauthMatchOffersComponent,
    AuthMatchOffersComponent,
    AllCategoriesComponent,
    ProductsCategoriesComponent,
    ServicesCategoriesComponent,
    MyOffersMatchesComponent,
    ShowAllComponent,
    HomeAuctionsComponent,
    HomeSection1Component,   
    HomeSection3Component,
    HomeSection4Component,
    HomeSection2Component,
    HomeSection5Component,
    ReferRewardAddComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    CarouselModule,
    PipesModule,
    DirectiveModule,
    InfiniteScrollModule,
    BreadCrumbModule,
    OfferCardDefaultModule,
    GridViewModule,
    FloatingListingModule,
    FloatingMenuModule,
    RouterModule.forChild([
      {
        path: '',
        component: WebHomeComponent
      },
      {
        path: 'home',
        component: WebHomeComponent
      },
      {
        path: 'show-all-offer',
        component: ShowAllComponent
      }
    ]),
    StoreModule.forFeature('utility', utilityReducer),
    EffectsModule.forFeature([UtilityEffects])
  ],
  providers: [
    HomeEntityService,
    HomeDataService
  ]
})

export class HomeModule {
  static forRoot(): ModuleWithProviders<HomeModule> {
    return {
      ngModule: HomeModule
    }
  }

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private homeDataService: HomeDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('AllOffers', homeDataService);
  }
}
