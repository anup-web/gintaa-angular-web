import { createAction, props } from '@ngrx/store';
import { } from '../models/favourite.model';
import { FAVOURITE_ACTION_TYPE } from '../configs/favourite.config';
import { Offer } from '@gintaa/shared/models/offer';

export const pageLoading = createAction(
    FAVOURITE_ACTION_TYPE.PAGE_LOADING
);

export const pageLoaded = createAction(
    FAVOURITE_ACTION_TYPE.PAGE_LOADED
);

export const addRemoveOfferToFavouriteSuccess = createAction(
    FAVOURITE_ACTION_TYPE.ADD_REMOVE_OFFER_TO_FAVOURITE_SUCCESS,
    props<{ offerId: string }>()
)

export const addRemoveOfferToFavouriteFailure = createAction(
    FAVOURITE_ACTION_TYPE.ADD_REMOVE_OFFER_TO_FAVOURITE_FAILURE,
    props<{ message: string }>()
)

export const getFavouriteOfferCount = createAction(
    FAVOURITE_ACTION_TYPE.GET_FAVOURITE_OFFER_COUNT,
    props<{ offerId: string}>()
)

export const getFavouriteOfferCountSuccess = createAction(
    FAVOURITE_ACTION_TYPE.ADD_REMOVE_OFFER_TO_FAVOURITE_SUCCESS,
    props<{ response: any }>()
)

export const getFavouriteOfferCountFailure = createAction(
    FAVOURITE_ACTION_TYPE.ADD_REMOVE_OFFER_TO_FAVOURITE_FAILURE,
    props<{ message: string }>()
)

export const getAllFavouriteOffers = createAction(
    FAVOURITE_ACTION_TYPE.GET_ALL_FAVOURITE_OFFERS,
    props<{ page: number }>()
)

export const getAllFavouriteOffersSuccess = createAction(
    FAVOURITE_ACTION_TYPE.GET_ALL_FAVOURITE_OFFERS_SUCCESS,
    props<{ response: Offer[] }>()
)

export const getAllFavouriteOffersEmpty = createAction(
    FAVOURITE_ACTION_TYPE.GET_ALL_FAVOURITE_OFFERS_EMPTY
)

export const getAllFavouriteOffersFailure = createAction(
    FAVOURITE_ACTION_TYPE.GET_ALL_FAVOURITE_OFFERS_FAILURE,
    props<{ message: string }>()
)

export const removeOfferFromFavoriteByOfferId = createAction(
    FAVOURITE_ACTION_TYPE.REMOVE_OFFER_FROM_FAVOURITE_BY_OFFER_ID,
    props<{ offerId: string}>()
)
