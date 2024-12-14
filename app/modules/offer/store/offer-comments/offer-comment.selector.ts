import { OfferAuction } from '@gintaa/shared/models/offer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferCommentState } from '../../model/offer-comments.model';

export const selectOfferCommentState =
    createFeatureSelector<OfferCommentState>("offerComments");

export const selectAuctionState = createFeatureSelector<OfferAuction>("offerAuctionModal");

export const currentAuctionModal = createSelector(
    selectAuctionState,
    auction => auction.currentAuctionModal
);