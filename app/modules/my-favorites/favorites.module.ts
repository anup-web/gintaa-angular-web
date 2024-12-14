import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@gintaa/core/core.module';
import { SharedModule } from '@gintaa/shared/modules/shared.module';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { favouriteReducer } from './store/favourite.reducer';
import { FavouriteEffects } from './store/favourite.effects';

import { MyFavoritesComponent } from './components/my-favorites/my-favorites.component';
import { FavoritesOffersComponent } from './components/my-favorites/favorites-offers/favorites-offers.component';
import { FavouriteOfferSkeletonComponent } from './components/my-favorites/favourite-offer-skeleton/favourite-offer-skeleton.component';


@NgModule({
  declarations: [    
    MyFavoritesComponent,
    FavoritesOffersComponent,
    FavouriteOfferSkeletonComponent, 
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule,
    CoreModule,
    InfiniteScrollModule,
    StoreModule.forFeature('favourite-offer', favouriteReducer),
    EffectsModule.forFeature([FavouriteEffects]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritesModule { }
