import { Action, createReducer, on } from '@ngrx/store';
import { BulkOfferState } from  '../models/bulk-offer.model';
import { OfferBulkUploadActions } from './action-types';

export const initialFavouriteState: BulkOfferState = {
    loading: true,
    successMessage: null,
    errorMessage: null,
    offers: []
};

const _offerBulkUploadReducer = createReducer(

    initialFavouriteState,

    on(
        OfferBulkUploadActions.bulkUploadOfferSuccess,
        (state, action) => ({
            ...state,
            offers: [ ...action.offers ],
            errorMessage: null,
            successMessage: 'favourite offers fetched successfully',
            loading: false,
        })
    ),

    on(
        OfferBulkUploadActions.bulkUploadOfferFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message,
            successMessage: null,
            loading: false,
        })
    ),

    on(
        OfferBulkUploadActions.removeOfferByOfferId,
        (state, action) => ({
            ...state,
            offers: [ ...state.offers.filter(offer => offer.offerId !== action.offerId) ],
            errorMessage: null,
            successMessage: null,
            loading: false,
        })
    ),

    on(
        OfferBulkUploadActions.clearUploadedOffers,
        (state) => ({
            ...state,
            offers: [],
            errorMessage: null,
            successMessage: null,
            loading: false,
        })
    ),

    on(
        OfferBulkUploadActions.publishOffersSuccess,
        (state) => ({
            ...state,
            errorMessage: null,
            successMessage: 'Offers published successfully!',
            loading: false,
        })
    ),

    on(
        OfferBulkUploadActions.publishOffersFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message,
            successMessage: null,
            loading: false,
        })
    ),

);

export function offerBulkUploadReducer(state: BulkOfferState, action: Action) {
    return _offerBulkUploadReducer(state, action);
}
