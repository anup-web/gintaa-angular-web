import { Action, createReducer, on } from "@ngrx/store";
import { defaultConfigMyOffer } from "../configs/my-offer.constant";
import { OfferTypes } from "../configs/my-offer.enum";
import { MyOfferState } from '../models/my-offers.model';
import * as MyOffersActions from './my-offer.actions';

const intialStateMyOffers: MyOfferState = {
   publishedOffers: []   
}

const myOffersReducer = createReducer(
    intialStateMyOffers,
    on(
        MyOffersActions.getInitialMyOffersAction, 
        (state, action) => ({
            ...state,
            ...intialStateMyOffers
        })
    ),

    on(
        MyOffersActions.removeUserOfferTypeDataAction, 
        (state, {offerType}) => {
            return {
                ...state,
                publishedOffers: [],
            }
        }
    ),

    on(
        MyOffersActions.loggedInUserOfferSuccess, 
        (state, {offers, offerType}) => {            
            return {
                ...state,
                publishedOffers: [...offers]
            }
            
        }
    ),

    on(
        MyOffersActions.removeOfferByOfferId,
        (state, { offerId, offerType }) => {
            switch (offerType) {
                case OfferTypes.Published:
                    return {
                        ...state,
                        publishedOffers: [
                            ...state.publishedOffers.filter((offer) => offer.offerId !== offerId)
                        ]
                    }

                default:
                    return { ...state }
            }
        }
    ),

    on(
        MyOffersActions.removeOfferFromFavoriteByOfferId,
        (state, { offerId, offerType }) => {
            switch (offerType) {
                case OfferTypes.Published:
                    let lastUpdatedOffer = state.publishedOffers.filter(offer => offer.offerId === offerId);
                    // console.log(lastUpdatedOffer[0]);
                    return {
                        ...state,
                        publishedOffers: [
                            ...state.publishedOffers.filter((offer) => offer.offerId !== offerId),
                            {
                                ...lastUpdatedOffer[0],
                                favourite: false
                            }
                        ]
                    }

                default:
                    return { ...state }
            }
        }
    ),

    on(
        MyOffersActions.removeDraftOfferSuccess,
        (state, {id}) => ({
            ...state,
            loading: false,
            successMessage: 'Draft Offer Remove Successfully',
            publishedOffers: state.publishedOffers.filter((offer) => offer.draftOfferId !== id),
            errorMessage: null
        })
      ),
    
      on(
        MyOffersActions.removeDraftOfferFailure,
        (state, action) => ({
            ...state,
            loading: false,
            successMessage: 'Draft Offer Remove Failed',
            errorMessage: null
        })
      ),
)

export function myOfferReducer(state: MyOfferState | undefined, action: Action) {
    return myOffersReducer(state, action);
}