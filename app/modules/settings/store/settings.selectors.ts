import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../models/settings.model';

export const selectSettingsState =
    createFeatureSelector<SettingsState>("auth");


export const currentAuthModal = createSelector(
    selectSettingsState,
    auth => auth.currentAuthModal
);

export const changeCurrentAuthModal = createSelector(
    selectSettingsState,
    auth => auth.changeCurrentAuthModal
);

export const currentUserEmail = createSelector(
    selectSettingsState,
    auth => auth.email
);

export const currentUserType = createSelector(
    selectSettingsState,
    auth => auth.userType
);

export const currentAuthErrorMessage = createSelector(
    selectSettingsState,
    auth => auth.errorMessage || null
);

export const currentUserDetails = createSelector(
    selectSettingsState,
    auth => {
        return {
            name: auth.name,
            phone: auth.phone,
            email: auth.email,
            dob: auth.dob,
            gender: auth.gender,
            picture: auth.picture,
            currentLocation: auth.currentLocation,
            currentAdress: auth.currentAdress,
            errorMessage: auth.errorMessage
        }
    }
);



export const currentAuthSuccessMessage = createSelector(
    selectSettingsState,
    auth => auth.successMessage || null
);

// export const isLoggedIn = createSelector(
//     selectSettingsState,
//     auth =>  !!auth.user

// );


// export const isLoggedOut = createSelector(
//     isLoggedIn,
//     loggedIn => !loggedIn
// );