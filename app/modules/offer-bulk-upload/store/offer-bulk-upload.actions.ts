import { Offer } from '@gintaa/shared/models/offer';
import { createAction, props } from '@ngrx/store';
import { OFFER_BULK_UPLOAD_ACTION_TYPE } from '../configs/offer-bulk-upload.config';


// offer favourites section
export const bulkUploadOffer = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.BULK_UPLOAD_OFFER,
    props<{ offers: Offer[]}>()
)

export const bulkUploadOfferSuccess = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.BULK_UPLOAD_OFFER_SUCCESS,
    props<{ offers: Offer[]}>()
)

export const bulkUploadOfferFailure = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.BULK_UPLOAD_OFFER_FAILURE,
    props<{ message: string }>()
)

export const removeOfferByOfferId = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.REMOVE_OFFER_BY_OFFER_ID,
    props<{ offerId: string }>()
)

export const clearUploadedOffers = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.CLEAR_UPLOADED_OFFERS
)

export const publishOffers = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.PUBLISH_OFFERS,
    props<{ offers: Offer[]}>()
)

export const publishOffersSuccess = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.PUBLISH_OFFERS_SUCCESS,
    props<{ offers: Offer[]}>()
)

export const publishOffersFailure = createAction(
    OFFER_BULK_UPLOAD_ACTION_TYPE.PUBLISH_OFFERS_FAILURE,
    props<{ message: string }>()
)
