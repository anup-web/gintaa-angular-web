import { Action, createReducer, on } from '@ngrx/store';
import { WishlistState } from '../models/wishlist.model';
import * as wishlistAntion from './wishlist.actions';


export const wishlistFeatureKey = 'wishlist';

export interface State {

}

export const initialStateWishlist: WishlistState = {
  wishlist: []
};

const wishlistReducer = createReducer(
  initialStateWishlist,
  on(
    wishlistAntion.getInitialWishlistAction, 
      (state, action) => ({
          ...state,
          ...initialStateWishlist
      })
  ),
  on(
    wishlistAntion.getWishlistActionResultSuccess, 
      (state, action) => ({
          ...state,
          // activeOffers: [...state.activeOffers, ...action.offers],
          wishlist: [...state.wishlist, ...action.wishlist]
      })
  ),

);

export function mywishlistReducer(state: WishlistState | undefined, action: Action) {
  return wishlistReducer(state, action);
}

