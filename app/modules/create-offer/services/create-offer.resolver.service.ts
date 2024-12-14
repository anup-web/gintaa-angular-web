import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, retry, take, tap } from 'rxjs/operators';
import { CreateOfferActions } from '../store/action-types';
import { selectInitiateOfferData, selectOfferInfo } from '../store/create-offer.selectors';
@Injectable({
    providedIn: 'root'
})

export class CreateOfferResolverService implements Resolve<boolean> {

    constructor(private store: Store<gintaaApp.AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const id: string = route.queryParamMap.get('id');
        const offerCategory: string = route.queryParamMap.get('category') || 'DRAFT';
        const offerType: string =  state.url.includes('item') ? 'item' : 'service';

        this.store.dispatch(CreateOfferActions.clearOfferData())

        if (id && offerCategory === 'DRAFT') {
            this.store.dispatch(CreateOfferActions.fetchDraftData({ id }))
        } else if (id && (offerCategory === 'PUBLISHED' || offerCategory === 'CLONE')) {
            this.store.dispatch(CreateOfferActions.fetchPublishedData({ id }))
        } 
        

        return this.store.pipe(
            select(selectInitiateOfferData),
            tap(loaded => {
              if (!loaded) {
                this.store.dispatch(CreateOfferActions.fetchOfferInitialData({ offerType })) 
              }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}