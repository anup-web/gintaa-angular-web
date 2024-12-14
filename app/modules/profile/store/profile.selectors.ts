import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState } from '../models/UserProfileState.model';

export const selectProfileState =
    createFeatureSelector<UserProfileState>("profile");


export const selectUserData = createSelector(
    selectProfileState,
    profile => {
        userInfo: profile.userInfo
    }
);
export const currentProfileScreen = createSelector(
    selectProfileState,
    profile => profile.currentProfileScreen
);
export const loader = createSelector(
    selectProfileState,
    profile => profile.loading
);

export const addEditAddressModalSelector = createSelector(
    selectProfileState,
    profile => profile.closeOpenedModel
);

export const addEditAddressStatusSelector = createSelector(
    selectProfileState,
    profile => profile.addEditAddressStatus
);

export const addressErrorSelector = createSelector(
    selectProfileState,
    profile => profile.message
);
export const selectUserAllOffers = createSelector(
    selectProfileState,
    profile => profile.userAllOffers
);
export const selectUserAllFeedback = createSelector(
    selectProfileState,
    profile => profile.userAllFeedback
);
export const selectfeedbackLoader = createSelector(
    selectProfileState,
    profile => profile.feedbackLoading
);
export const selectfprofileUpdated = createSelector(
    selectProfileState,
    profile => profile.profileUpdated
);
export const addressPayloadErrorSelector = createSelector(
    selectProfileState,
    profile => profile.payloadValidation
);

