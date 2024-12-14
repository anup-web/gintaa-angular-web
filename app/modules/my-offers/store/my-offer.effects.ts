import { Injectable } from "@angular/core";
import { configUrls } from "@gintaa/config/api-urls.config";
import { CreateOfferService } from "@gintaa/modules/create-offer/services/create-offer.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap } from "rxjs/operators";
import { Offer } from "../models/my-offers.model";
import { MyOfferService } from "../services/my-offer.service";
import * as myOffersActions from "./my-offer.actions";
@Injectable()
export class MyOffersEffects {

    constructor
        (
            private actions$: Actions,
            private myOffersService: MyOfferService,
            private createOfferService: CreateOfferService
        ) { }

    getLoggedInUserOffers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(myOffersActions.getUserOfferTypeDataAction),
            switchMap((action) => {
                let offerTypeUrl: string = null;
                if (action.payload.offerTypes.length) {
                    let offerTypes = action.payload.offerTypes.join(',');
                    offerTypeUrl = `${configUrls.loggedInUserAllOffers}?states=${offerTypes}`
                } else {
                    offerTypeUrl = configUrls.loggedInUserAllOffers
                }

            return this.myOffersService.getLoggedInUserOffers(action.payload, offerTypeUrl)
                .pipe(
                    map((offers: Offer[]) => {
                        return myOffersActions.loggedInUserOfferSuccess({
                            offers,
                            offerType: action.payload.offerTypes
                        })
                    }),
                    catchError((error) => {
                        return of(myOffersActions.loggedInUserOfferFailure({ error }));
                    })
                )
            })
        )
    });

    removeDraftOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(myOffersActions.removeDraftOffer),
            switchMap((action) => {
                return this.createOfferService.removeDraftOfferById(action.id)
                    .pipe(
                        map((resData: any) => {
                            return myOffersActions.removeDraftOfferSuccess({
                                id: resData.payload.draftOfferId
                            });
                        }),
                        catchError((error: any) => {
                            return of(
                                myOffersActions.removeDraftOfferFailure({ error: 'Remove Draft Offer Failed' })
                            )
                        }),
                    );
            })
        )
    );
}