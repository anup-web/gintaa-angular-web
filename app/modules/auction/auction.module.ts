import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOfferPrimaryInfoModule } from '@gintaa/shared/features/create-offer-primary-info/create-offer-primary-info.module';
import { CreateOfferTipsModule } from '@gintaa/shared/features/create-offer-tips/create-offer-tips.module';
import { DocumentUploadModule } from '@gintaa/shared/features/document-upload';
import { MediaUploadModule } from '@gintaa/shared/features/media-upload';
import { PostOfferModule } from '@gintaa/shared/features/post-offer/post-offer.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CreateOfferEffects } from '../create-offer/store/effects/create-offer.effects';
import { createOfferReducer } from '../create-offer/store/reducers/create-offer.reducer';
import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionComponent } from './auction.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuctionRoutingModule, 
    MediaUploadModule,
    DocumentUploadModule,
    CreateOfferPrimaryInfoModule,
    CreateOfferTipsModule,
    PostOfferModule
  ],
  declarations: [AuctionComponent],
})
export class AuctionModule { }
