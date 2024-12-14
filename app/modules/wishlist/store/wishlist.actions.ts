import { createAction, props } from '@ngrx/store';
import { WISHLIST_ACTION_TYPE } from '../configs/wishlist.config';

export const loadWishlists = createAction(
  '[Wishlist] Load Wishlists'
);

export const loadWishlistsSuccess = createAction(
  '[Wishlist] Load Wishlists Success',
  props<{ data: any }>()
);

export const loadWishlistsFailure = createAction(
  '[Wishlist] Load Wishlists Failure',
  props<{ error: any }>()
);


export const getInitialWishlistAction = createAction(
  WISHLIST_ACTION_TYPE.INITIALISE_WISHLIST
)

export const getWishlistAction = createAction(
  WISHLIST_ACTION_TYPE.GET_WISHLIST
);
export const getWishlistActionResultSuccess = createAction(
  WISHLIST_ACTION_TYPE.GET_WISHLIST_SUCCESS,
  props<{ wishlist: any[] }>()
);
export const getWishlistActionResultFailure = createAction(
  WISHLIST_ACTION_TYPE.GET_WISHLIST_FAILURE,
  props<{ error: any }>()
);


