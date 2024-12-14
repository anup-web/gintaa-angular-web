import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavouriteService } from '../services/favourite.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { FavouriteActions } from './action-types';
import {  } from '@gintaa/modules/my-favorites/models/favourite.model';
import { FAVOURITE_ACTION_TYPE } from '../configs/favourite.config';

@Injectable()
export class FavouriteEffects {

    constructor(
        private actions$: Actions,
        private favouriteService: FavouriteService,
    ) { }

    getAllFavouriteOffers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(FavouriteActions.getAllFavouriteOffers),
            mergeMap((action)=>{
                return this.favouriteService.getAllFavouriteOffers(action.page)
                .pipe(
                    map((res: any) => {
                        if (res.payload) {
                            return FavouriteActions.getAllFavouriteOffersSuccess({
                                response: res.payload
                            })
                        } else {
                            return FavouriteActions.getAllFavouriteOffersEmpty()
                        }
                    }),
                    catchError((error)=>{
                        return of(FavouriteActions.getAllFavouriteOffersFailure({
                            message: error.message
                        }));
                    })
                )
            })
        )
    })

    getFavouriteOfferCount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(FavouriteActions.getFavouriteOfferCount),
            mergeMap((action)=>{
                return this.favouriteService.getFavouriteOfferCount(action.offerId)
                .pipe(
                    map((res: any) => {
                        return FavouriteActions.getFavouriteOfferCountSuccess({
                            response: res.payload
                        })
                    }),
                    catchError((error)=>{
                        return of(FavouriteActions.getFavouriteOfferCountFailure({
                            message: error.message
                        }));
                    })
                )
            })
        )
    })
}
