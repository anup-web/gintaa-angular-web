import { Action, createReducer, on } from '@ngrx/store';
import { FavouriteState } from  '../models/favourite.model';
import { FavouriteActions } from './action-types';

export const initialFavouriteState: FavouriteState = {
    loading: true,
    successMessage: null,
    errorMessage: null,
    myFavoriteOffers: [],
    offerRemovedId: null,
};

const _favouriteReducer = createReducer(

    initialFavouriteState,
  
    on(
        FavouriteActions.pageLoading,
        (state) => ({
          ...state,
          loading: true,
        })
    ),
    
    on(
        FavouriteActions.pageLoaded,
        (state) => ({
            ...state,
            loading: false,
        })
    ),

    
    on(
        FavouriteActions.getAllFavouriteOffersSuccess,
        (state, action) => ({
            ...state,
            myFavoriteOffers: [
                ...state.myFavoriteOffers,
                ...action.response
            ],
            errorMessage: null,
            successMessage: 'favourite offers fetched successfully',
            offerRemovedId: null,
            loading: false,
        })
    ),

    on(
        FavouriteActions.getAllFavouriteOffersEmpty,
        (state) => ({
            ...state,
            myFavoriteOffers: [],
            errorMessage: null,
            successMessage: 'favourite offers fetched successfully',
            offerRemovedId: null,
            loading: false,
        })
    ),

    on(
        FavouriteActions.getAllFavouriteOffersFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message,
            successMessage: null,
            offerRemovedId: null,
            loading: false,
        })
    ),

    on(
        FavouriteActions.addRemoveOfferToFavouriteSuccess,
        (state, action) => ({
            ...state,
            errorMessage: null,
            successMessage: 'operation successfull',
            offerRemovedId: action.offerId,
            loading: false,
        })
    ),

    on(
        FavouriteActions.addRemoveOfferToFavouriteFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message,
            successMessage: null,
            offerRemovedId: null,
        })
    ),

    on(
        FavouriteActions.getFavouriteOfferCountSuccess,
        (state, action) => ({
            ...state,
            errorMessage: null,
            successMessage: 'Get favourite offers successfull',
            currentOfferFavouriteCount: action.response
        })
    ),

    on(
        FavouriteActions.getFavouriteOfferCountFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message,
            successMessage: null
        })
    ),

    on(
        FavouriteActions.removeOfferFromFavoriteByOfferId,
        (state, action) => ({
            ...state,
            errorMessage: null,
            successMessage: null,
            myFavoriteOffers: [
                ...state.myFavoriteOffers.filter(offer => offer.offerId !== action.offerId)
            ],
            offerRemovedId: null,
        })
    ),
);

export function favouriteReducer(state: FavouriteState, action: Action) {
    return _favouriteReducer(state, action);
}
