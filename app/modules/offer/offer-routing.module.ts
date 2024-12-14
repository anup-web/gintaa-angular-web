import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferResolver } from './services/offer-resolver.service';
import { FavoriteOffersResolver } from './services/favorite-offers-resolver.service';

const offerRoutes: Routes = [
  // {
  //   path: ':userId/offers', 
  //   component: UserAllOfferComponent,
  //   pathMatch: 'full'
  // },
  {
    path: ':userId/offers',
    loadChildren: () => import('../user-all-offer/user-all-offer.module').then(m => m.UserAllOfferModule),
    pathMatch: 'full'
  },
  {
    path: ':offerId/matches', 
    loadChildren: () => import('../user-matches-offer/user-matches-offer.module').then(m => m.UserMatchesOfferModule),
    pathMatch: 'full'
  },  
  {
    path: ':id',
    loadChildren: () => import('./modules/offer-component/offer-component.module').then(m => m.OfferComponentModule),
    // resolve: {
    //   offer: OfferResolver
    //  }
  },
  {
    path: ':type/:id',
    loadChildren: () => import('./modules/offer-component/offer-component.module').then(m => m.OfferComponentModule),
    pathMatch: 'full'
    // resolve: {
    //   offer: OfferResolver
    // }
  },
  {
    path: 'recommended-offers', 
    loadChildren: () => import('../see-all-offer/see-all-offer.module').then(m => m.SeeAllOfferModule),
    pathMatch: 'full'
  },
  {
    path: 'favorite-offers', 
    loadChildren: () => import('../favorit-offers/favorit-offers.module').then(m => m.FavoritOffersModule),
    pathMatch: 'full',
    resolve: {
      FavoriteOffers: FavoriteOffersResolver
     }
  },  
];

@NgModule({
  imports: [RouterModule.forChild(offerRoutes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
