import { OfferAuction } from "@gintaa/shared/models/offer";
import { Action, createReducer, on } from "@ngrx/store";
import { CURRENT_AUCTION_MODAL } from "./offer-comment.action-types";
import * as offerAuctionAction from './offer-comment.actions';

const intialAuctionState: OfferAuction = {
    currentAuctionModal: CURRENT_AUCTION_MODAL.AUCTION_CLOSE || null,
    successMessage: null,
    errorMessage: null,
    loading: false,
}

const _offerAuctionReducer = createReducer(
    intialAuctionState,

    on(
        offerAuctionAction.redirectToAuctionBuy,
        (state) => ({
            ...state,
            loading: false,
            currentAuctionModal: CURRENT_AUCTION_MODAL.AUCTION_BUY,
            successMessage: null,
            errorMessage: null
        })
    ),
    
    on(
        offerAuctionAction.redirectToAuctionSuccess,
        (state) => ({
            ...state,
            loading: false,
            currentAuctionModal: CURRENT_AUCTION_MODAL.AUCTION_SUCCESS,
            successMessage: null,
            errorMessage: null
        })
    )
)


export function offerAuctionReducer(state: OfferAuction | undefined, action: Action) {
    return _offerAuctionReducer(state, action);
}
