import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { OfferCreatedComponent } from './components/offer/offer-created/offer-created.component';
import { OfferApprovedComponent } from './components/offer/offer-approved/offer-approved.component';
import { NewDealSuggestionComponent } from './components/deal/new-deal-suggestion/new-deal-suggestion.component';
import { NewMatchComponent } from './components/new-match/new-match.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DealAcceptanceComponent } from './components/deal/deal-acceptance/deal-acceptance.component';
import { SuccessDealCloseComponent } from './components/deal/success-deal-close/success-deal-close.component';
import { OfferBidComponent } from './components/offer/offer-bid/offer-bid.component';
import { NotificationRoutingModule } from './notification-routing.module';


@NgModule({
  declarations: [
    NotificationListComponent,
    OfferCreatedComponent,
    OfferApprovedComponent,
    OfferBidComponent,
    NewDealSuggestionComponent,
    NewMatchComponent,
    DealAcceptanceComponent,
    SuccessDealCloseComponent
  ],
  imports: [CommonModule, InfiniteScrollModule, NotificationRoutingModule],
  exports: [NotificationListComponent],
})
export class NotificationModule { }
