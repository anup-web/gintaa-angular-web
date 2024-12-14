import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { defaultConfigMyOffer } from '../configs/my-offer.constant';
import { OfferInput } from '../models/my-offers.model';
import * as MyOffersActions from '../store/my-offer.actions';
import { selectPublishedOffers } from '../store/my-offer.selector';
import { MyOfferService } from './my-offer.service';

@Injectable({
    providedIn: 'root'
})

export class MyOfferResolverService implements Resolve<boolean> {
    constructor(
        private store: Store<gintaaApp.AppState>,
        private myOfferService: MyOfferService
        ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { 
        const payload: OfferInput = {
            offerTypes: [],
            page: defaultConfigMyOffer.page,
            offset: defaultConfigMyOffer.offset
        }
        this.myOfferService.filterValue.next(null);
        this.store.dispatch(MyOffersActions.getInitialMyOffersAction());
        return this.store.pipe(
            select(selectPublishedOffers),
            tap(loaded => {
              if (!loaded) {                
                this.store.dispatch(MyOffersActions.getUserOfferTypeDataAction({ payload }));
              }
            }),
            // filter(loaded => loaded),
            take(1)
          );
    }   
}