import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UtilityState } from '../models/UtilityState.model';

export const selectUtilityState =
    createFeatureSelector<UtilityState>("utility");
