import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MatchBoxState } from '../models/matchbox.model';

export const selectMatchBoxState =
    createFeatureSelector<MatchBoxState>("matchbox");


export const selectMatchBoxData = createSelector(
    selectMatchBoxState,
    matchBox => matchBox.myMatchBox
);

export const errorMsgSelector = createSelector(
    selectMatchBoxState,
    matchBox => matchBox.errorMessage
);

export const successMsgSelector = createSelector(
    selectMatchBoxState,
    matchBox => matchBox.successMessage
);
export const searchMatchBoxSelector = createSelector(
    selectMatchBoxState,
    matchBox => matchBox.searchMatchBox
);
