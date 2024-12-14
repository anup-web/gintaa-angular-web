import { Route } from '@angular/router';
import { CREATE_OFFER_TYPE } from './configs/create-offer.config';

import { CreateOfferComponent } from './create-offer.component';
import { IsEnableAuctionGuard } from './guards/is-enable-auction.guard';

export const CREATE_OFFER_ROUTE: Route = {
    path: '',
    component: CreateOfferComponent,
    // resolve: { offerData: CreateOfferResolverService },       
    children: [
        {
            path: 'item',
            loadChildren: () => import('../item/item.module').then(m => m.ItemModule),
            data : {offerType : CREATE_OFFER_TYPE.ITEM}
            // canDeactivate: [CanDeactivateGuard],
        },
        {
            path: 'service',
            loadChildren: () => import('../service/service.module').then(m => m.ServiceModule),            
            data : {offerType : CREATE_OFFER_TYPE.SERVICE}
            // canDeactivate: [CanDeactivateGuard],
        },
        {
            path: 'auction',
            loadChildren: () => import('../auction/auction.module').then(m => m.AuctionModule), 
            data : {offerType : CREATE_OFFER_TYPE.AUCTION},
            canLoad: [IsEnableAuctionGuard]
            // canDeactivate: [CanDeactivateGuard],
        }   
    ]
} 