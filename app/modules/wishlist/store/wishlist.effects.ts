import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { WishlistService } from '../services/wishlist.service';
import * as wishlistAntion from './wishlist.actions';



@Injectable()
export class WishlistEffects {


//
  constructor(private actions$: Actions , private wishlistService: WishlistService) {}

  getWishlist$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(wishlistAntion.getWishlistAction),
        mergeMap((action)=>{
            return this.wishlistService.getWishlist()
            .pipe(
                map((wishlist: any) => {
                    return wishlistAntion.getWishlistActionResultSuccess({
                        wishlist: wishlist
                    })
                }),
                catchError((error)=>{
                    return of(wishlistAntion.getWishlistActionResultFailure({ error }));
                })
            )
        })
    )
  })

}
