import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Offer } from '@gintaa/shared/models/offer';
import { PipesModule } from '@gintaa/shared/pipes/pipes.modules';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OfferRoutingModule } from './offer-routing.module';
import { FavoriteOffersDataService } from './services/favorite-offers-data.service';
import { FavoriteOffersEntityService } from './services/favorite-offers-entity.service';
import { FavoriteOffersResolver } from './services/favorite-offers-resolver.service';
import { OfferDataService } from './services/offer-data.service';
import { OfferEntityService } from './services/offer-entity.service';
import { OfferResolver } from './services/offer-resolver.service';
import { offerAuctionReducer } from './store/offer-comments/offer-auction.reducer';
import { OfferCommentEffects } from './store/offer-comments/offer-comment.effects';
import { offerCommentReducer } from './store/offer-comments/offer-comment.reducer';


const entityMetadata: EntityMetadataMap = {
  Offers: {
    selectId: (offer: Offer) => offer.offerId,
    entityDispatcherOptions: { 
      // optimisticUpdate: true
    }
  },
  FavoriteOffers: {
    selectId: (offer: Offer) => offer.offerId,
    entityDispatcherOptions: { 
      // optimisticUpdate: true
    }
  }
};
@NgModule({
  imports: [
    OfferRoutingModule,
    CommonModule,
    PipesModule,
    StoreModule.forFeature('offerComments', offerCommentReducer),
    StoreModule.forFeature('offerAuctionModal', offerAuctionReducer),
    EffectsModule.forFeature([OfferCommentEffects])
  ],
  providers: [
    OfferEntityService,
    OfferResolver,
    OfferDataService,
    FavoriteOffersEntityService,
    FavoriteOffersDataService,
    FavoriteOffersResolver
  ],
})
export class OfferModule { 

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private offerDataService: OfferDataService,
    private favoriteOfferDataService: FavoriteOffersDataService,
    ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Offers', offerDataService);
    entityDataService.registerService('FavoriteOffers', favoriteOfferDataService);
  }
}
