import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OfferCardAuctionModule } from '../offer-card-auction/offer-card-auction.module';
import { OfferCardDefaultModule } from '../offer-card-default/offer-card-default.module';
import { GridViewComponent } from './grid-view.component';

@NgModule({
  declarations: [
    GridViewComponent,
  ],
  imports: [
    CommonModule,
    OfferCardDefaultModule,
    OfferCardAuctionModule
  ],
  exports: [
    GridViewComponent,
  ]
})
export class GridViewModule { }
