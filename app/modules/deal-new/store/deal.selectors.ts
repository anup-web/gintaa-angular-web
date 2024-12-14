import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DealState } from '../models/deal.model';

export const selectDealState =
    createFeatureSelector<DealState>("deal");

export const selectReceiverAllOffers = createSelector(
    selectDealState,
    deal => deal.initiateDeal.receiverAllOffers
);
export const selecSenderAllOffers = createSelector(
    selectDealState,
    deal => deal.initiateDeal.senderAllOffers
);

export const selectReceiverSelectedOffers = createSelector(
    selectDealState,
    deal => deal.initiateDeal.receiverSelectedOffers
);
export const selectSenderSelectedOffers = createSelector(
    selectDealState,
    deal => deal.initiateDeal.senderSelectedOffers
);

export const closeDealModel = createSelector(
    selectDealState,
    deal => deal.closeDealModelType
);

export const addDealStatus = createSelector(
    selectDealState,
    deal => deal.dealAddStatus
);
export const loader = createSelector(
    selectDealState,
    deal => deal.loading
);
export const navigateTodealList = createSelector(
    selectDealState,
    deal => deal.navigateTodealList
);
export const closeStep = createSelector(
    selectDealState,
    deal => deal.closeStep
);

export const dealErrorSelector = createSelector(
    selectDealState,
    deal => deal.errorMessage
);
export const dealSuccessSelector = createSelector(
    selectDealState,
    deal => deal.successMessage
);
export const ratingQuestionsSelector = createSelector(
    selectDealState,
    deal => deal.ratingQuestions
);

export const selectInitiateDeal = createSelector(
    selectDealState,
    deal => deal.initiateDeal
);
export const selectlastFetchedDealDetails = createSelector(
    selectDealState,
    deal => deal.lastFetchedDealDetails
);

export const selectlastFetchedDealHistory = createSelector(
    selectDealState,
    deal => deal.lastFetchedDealHistory
);

export const selectlastFetchedDealRating = createSelector(
    selectDealState,
    deal => deal.lastFetchedDealRating
);
export const selectlotpPayload = createSelector(
    selectDealState,
    deal => deal.otpPayload
);

