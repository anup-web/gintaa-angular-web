import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyOfferState } from '../models/my-offers.model';

export const selectMyOfferState =
    createFeatureSelector<MyOfferState>("myOffers");

export const selectPublishedOffers = createSelector(
    selectMyOfferState,
    offer => !!offer.publishedOffers.length
);