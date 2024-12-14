import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfferCardAuctionComponent } from './offer-card-auction.component';

@NgModule({
  declarations: [
    OfferCardAuctionComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OfferCardAuctionComponent,
  ]
})
export class OfferCardAuctionModule { }
