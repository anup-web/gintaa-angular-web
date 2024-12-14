import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaSwiperModule } from '@gintaa/shared/features/media-swiper/media-swiper.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { AuctionBuyComponent } from '../../components/offer/auction-popup/auction-buy/auction-buy.component';
import { AuctionCloseComponent } from '../../components/offer/auction-popup/auction-close/auction-close.component';
import { AuctionPopupComponent } from '../../components/offer/auction-popup/auction-popup.component';
import { AuctionSuccessComponent } from '../../components/offer/auction-popup/auction-success/auction-success.component';
import { AdminBusinessComponent } from '../../components/offer/business-admin-popup/admin-business/admin-business.component';
import { AdminChangeComponent } from '../../components/offer/business-admin-popup/admin-change/admin-change.component';
import { BusinessAdminPopupComponent } from '../../components/offer/business-admin-popup/business-admin-popup.component';
import { EmployeeChangeComponent } from '../../components/offer/business-admin-popup/employee-change/employee-change.component';
import { OwnerChangeComponent } from '../../components/offer/business-admin-popup/owner-change/owner-change.component';
import { DeleteOfferPopupComponent } from '../../components/offer/delete-offer-popup/delete-offer-popup.component';
import { HideOfferPopupComponent } from '../../components/offer/hide-offer-popup/hide-offer-popup.component';
import { OffersCommentsComponent } from '../../components/offer/offers-comments/offers-comments.component';

import { ReportCommentsPopupComponent } from '../../components/offer/report-comments-popup/report-comments-popup.component';
import { ReportOfferPopupComponent } from '../../components/offer/report-offer-popup/report-offer-popup.component';
import { OffersBidsComponent } from '../offers-bids/offers-bids.component';
import { OffersDealsComponent } from '../offers-deals/offers-deals.component';
import { OthersOffersModule } from '../others-offers/others-offers.module';
import { PotentialMatchesModule } from '../potential-matches/potential-matches.module';
import { SocialLinkDialogsComponent } from '../social-link-dialogs/social-link-dialogs.component';
import { UserSimilarOffersModule } from '../user-similar-offers/user-similar-offers.module';
import { ItemOfferDetailsComponent } from './item-offer-details.component';

@NgModule({
  declarations: [
    ItemOfferDetailsComponent,
    OffersCommentsComponent,    
    ReportOfferPopupComponent,
    ReportCommentsPopupComponent,
    AuctionPopupComponent,
    AuctionCloseComponent,
    AuctionBuyComponent,
    AuctionSuccessComponent,
    BusinessAdminPopupComponent,
    AdminBusinessComponent,
    AdminChangeComponent,
    OwnerChangeComponent,
    EmployeeChangeComponent,
    DeleteOfferPopupComponent,
    HideOfferPopupComponent,
    SocialLinkDialogsComponent,
    OffersDealsComponent,
    OffersBidsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MediaSwiperModule,
    OthersOffersModule,
    UserSimilarOffersModule,
    PotentialMatchesModule
  ],
  exports: [
    ItemOfferDetailsComponent,
    OffersCommentsComponent,    
    OffersDealsComponent,
    OffersBidsComponent,
    ReportOfferPopupComponent,
    ReportCommentsPopupComponent,
    AuctionPopupComponent,
    AuctionCloseComponent,
    AuctionBuyComponent,
    AuctionSuccessComponent,
    BusinessAdminPopupComponent,
    AdminBusinessComponent,
    AdminChangeComponent,
    OwnerChangeComponent,
    EmployeeChangeComponent,
    DeleteOfferPopupComponent,
    HideOfferPopupComponent,
    SocialLinkDialogsComponent,
  ]
})
export class ItemOfferDetailsModule { }
