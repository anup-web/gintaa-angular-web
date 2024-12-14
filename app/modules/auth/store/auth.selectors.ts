import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth.model';

export const selectAuthState =
    createFeatureSelector<AuthState>("auth");


export const currentAuthModal = createSelector(
    selectAuthState,
    auth => auth.currentAuthModal
);

export const changeCurrentAuthModal = createSelector(
    selectAuthState,
    auth => auth.changeCurrentAuthModal
);

export const currentUserEmail = createSelector(
    selectAuthState,
    auth => auth.email
);

export const currentUserType = createSelector(
    selectAuthState,
    auth => auth.userType
);

export const currentAuthErrorMessage = createSelector(
    selectAuthState,
    auth => auth.errorMessage || null
);

export const currentUserDetails = createSelector(
    selectAuthState,
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
            errorMessage: auth.errorMessage,
            successMessage: auth.successMessage
        }
    }
);

// export const isLoggedIn = createSelector(
//     selectAuthState,
//     auth =>  !!auth.user

// );


// export const isLoggedOut = createSelector(
//     isLoggedIn,
//     loggedIn => !loggedIn
// );
