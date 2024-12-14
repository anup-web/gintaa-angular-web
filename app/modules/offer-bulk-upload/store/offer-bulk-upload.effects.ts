import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfferBulkUploadService } from '../services/offer-bulk-upload.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OfferBulkUploadActions } from './action-types';

@Injectable()
export class OfferBulkUploadEffects {

    constructor(
        private actions$: Actions,
        private offerBulkUploadService: OfferBulkUploadService,
    ) { }

    getAllFavouriteOffers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OfferBulkUploadActions.bulkUploadOffer),
            mergeMap((action) => {
                return this.offerBulkUploadService.bulkUploadOfferMock(action.offers)
                .pipe(
                    map((res: any) => {
                        return OfferBulkUploadActions.bulkUploadOfferSuccess({
                            offers: res.payload
                        })
                    }),
                    catchError((error) => {
                        return of(OfferBulkUploadActions.bulkUploadOfferFailure({
                            message: error.message
                        }));
                    })
                )
            })
        )
    })

}
