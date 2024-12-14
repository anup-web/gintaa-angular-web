import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BusinessState } from '../models/BusinessState.model';

export const selectBusinessState =
    createFeatureSelector<BusinessState>("business");

export const addEditAddressStatusSelector = createSelector(
    selectBusinessState,
    business => business.addEditAddressStatus
);