import { createAction, props } from "@ngrx/store";
import { Offer, OfferInput } from "../models/my-offers.model";
import { MyOfferActionEnums } from "./my-offer.action-types";

export const getInitialMyOffersAction = createAction(
    MyOfferActionEnums.INITIALIZE_MY_OFFERS
)

export const removeUserOfferTypeDataAction = createAction(
    MyOfferActionEnums.LOGGED_IN_USER_MY_OFFER_REMOVE,
    props<{ offerType: string[]}>()
)

export const getUserOfferTypeDataAction = createAction(
    MyOfferActionEnums.LOGGED_IN_USER_OFFER,
    props<{ payload: OfferInput}>()
)

export const loggedInUserOfferSuccess = createAction(
    MyOfferActionEnums.LOGGED_IN_USER_OFFER_SUCCESS,
    props<{
        offers: Offer[];
        offerType: string[];
    }>()
)

export const loggedInUserOfferFailure = createAction(
    MyOfferActionEnums.LOGGED_IN_USER_OFFER_FAILURE,
    props<{error: any}>()
)

export const removeOfferByOfferId = createAction(
    MyOfferActionEnums.REMOVE_OFFER_BY_OFFER_ID,
    props<{
        offerId: string;
        offerType: string;
    }>()
)

export const removeOfferFromFavoriteByOfferId = createAction(
    MyOfferActionEnums.REMOVE_OFFER_FROM_FAVORITE_BY_OFFER_ID,
    props<{
        offerId: string;
        offerType: string;
    }>()
)

export const removeDraftOffer = createAction(
    MyOfferActionEnums.REMOVE_DRAFT_OFFER,
    props<{
        id: string
    }>()
);

export const removeDraftOfferSuccess = createAction(
    MyOfferActionEnums.REMOVE_DRAFT_OFFER_SUCCESS, 
    props<{
        id: string
    }>()   
);

export const removeDraftOfferFailure = createAction(
    MyOfferActionEnums.REMOVE_DRAFT_OFFER_FAILURE,
    props<{
        error: string
    }>()
);

