import { Action, createReducer, on } from '@ngrx/store';
import { CURRENT_AUTH_MODAL } from '../configs/auth.config';
import { AuthState } from '../models/auth.model';
import { AuthActions } from './action-types';

export const initialAuthState: AuthState = {
    currentAuthModal: CURRENT_AUTH_MODAL.SIGN_IN_WITH_MOBILE || null,
    // currentAuthModal: CURRENT_AUTH_MODAL.VERIFY_OTP_WITH_MOBILE,
    loading: false,
    authLoader: false,
    userInfo: null,
    userId: null,
    loggedIn: false,
    isGuest: false,
    token: null,
    email: null,
    isEmailDisabled: false,
    phone: null,
    isPhoneDisabled: false,
    name: null,
    dob: null,
    gender: null,
    currentLocation: null,
    currentAdress: null,
    firebaseResponse: null,
    firebaseUser: null,
    otp: null,
    otpSent: false,
    otpReceived: false,
    otpVerified: false,
    otpInvalidCount: 0,
    tokenExpiration: null,
    loginExpired: false,
    refreshByTime: null,
    successMessage: null,
    errorMessage: null,
    authType: null,
    picture: null,
    changeCurrentAuthModal: false,
    closeCurrentAuthModal: null,
    userType: 'new_user',
    verificationTransactionId: '',
    closeOtpModel: false,
    isVerified: false,
    profileError: '',
    payloadValidation: [],
    isProfileComplete: false,
    logOutTriggered: false
};

const _authReducer = createReducer(
    initialAuthState,

    on(
        AuthActions.showAuthLoader,
        (state) => ({
            ...state,
            authLoader: true,
        })
    ),

    on(
        AuthActions.hideAuthLoader,
        (state) => ({
            ...state,
            authLoader: false,
        })
    ),

    // on(
    //     AuthActions.logout,
    //     () => ({
    //         ...initialAuthState
    //     })
    // ),

    on(
        AuthActions.firebaseAuthSuccess,
        (state, action) => ({
            ...state,
            currentAuthModal: CURRENT_AUTH_MODAL.VERIFY_OTP_WITH_MOBILE,
            loading: false,
            successMessage: 'OTP Sent Success',
            errorMessage: null,
            firebaseResponse: action?.response,
            otpSent: true,
            phone: action.phone,
            authType: 'mobile',
            authLoader: false,
        })
    ),

    on(
        AuthActions.firebaseAuthFailure,
        (state, action) => ({
            ...state,
            loading: false,
            authLoader: false,
            errorMessage: action.error
        })
    ),

    on(
        AuthActions.profileImageError,
        (state, action) => ({
            ...state,
            loading: false,
            profileError: action.error
        })
    ),

    on(
        AuthActions.profileImageUploadStart,
        (state, action) => ({
            ...state,
            profileError: ''
        })
    ),

    on(
        AuthActions.changeCurrentAuthModal,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: action.page,
            phone: null,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.saveFirebaseAuthUser,
        (state, action) => ({
            ...state,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_NAME,
            isPhoneDisabled: action.isPhoneDisabled,
            loading: false,
            authLoader: false,
            successMessage: action.message,
            otpVerified: true,
            errorMessage: null,
        })
    ),
    on(
        AuthActions.userLoggedInSuccess,
        (state, action) => ({
            ...state,
            successMessage: action.message,
            loading: false,
            errorMessage: null,
            changeCurrentAuthModal: true,
            otpVerified: true,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_ADDRESS,
        })
    ),
    on(
        AuthActions.saveFullName,
        (state, action) => ({
            ...state,
            name: action.name,
            // currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.saveEmailAndPhone,
        (state, action) => ({
            ...state,
            email: action.email,
            phone: action.phone,
            // currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_DOB_GENDER,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.saveDobAndGender,
        (state, action) => ({
            ...state,
            dob: action.dob,
            gender: action.gender,
            // currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_LOCATION,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.updateUserProfileSuccess,
        (state, action) => ({
            ...state,
            name: action.user.displayName,
            successMessage: action.message,
            loading: false,
            errorMessage: null,
            changeCurrentAuthModal: true,
            dob: action.user.dob ? action.user.dob : state.dob
        })
    ),

    on(
        AuthActions.addUserAddressSuccess,
        (state, action) => ({
            ...state,
            successMessage: action.message,
            loading: false,
            errorMessage: null,
            payloadValidation: [],
            changeCurrentAuthModal: true,
        })
    ),

    on(
        AuthActions.updateUserProfileNameSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            name: action.user.displayName,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE,
            successMessage: action.message,
            errorMessage: null
        })
    ),

    on(
        AuthActions.updateUserProfilePhoneEmailSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            // name: action.user.displayName,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_IMAGE,
            successMessage: action.message,
            errorMessage: null
        })
    ),

    on(
        AuthActions.updateUserProfileDOBGenderSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            // gender: action.user.gender,
            // dob: action.user.dob,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_LOCATION,
            successMessage: action.message,
            errorMessage: null
        })
    ),

    on(
        AuthActions.closeCurrentAuthModal,
        (state) => ({
            ...state,
            loading: false,
            authLoader: false,
            closeCurrentAuthModal: true,
            successMessage: null,
            errorMessage: null
        })
    ),

    on(
        AuthActions.updateUserProfileFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.error?.status > 400 ? { ...action.error, message: action.error?.error ? action.error.error?.error : action.error?.message } : action.error,
            loading: false,
            authLoader: false,
        })
    ),

    on(
        AuthActions.addUserAddressFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.error,
            loading: false,
            payloadValidation: action.payload
        })
    ),

    on(
        AuthActions.emailLoginStart,
        (state, action) => ({
            ...state,
            email: action.email,
            loading: false,
            userType: action.userType,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_PASSWORD,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.phoneLoginStart,
        (state, action) => ({
            ...state,
            userType: action.userType,
        })
    ),
    on(
        AuthActions.checkUserStart,
        (state, action) => ({
            ...state,
            phone: action.loginType == 'phone' ? action.userInfo : null,
            email: action.loginType == 'email' ? action.userInfo : null,
        })
    ),
    on(
        AuthActions.firebaseAuthSuccessEmailPassword,
        (state, action) => ({
            ...state,
            loading: false,
            isEmailDisabled: action.isEmailDisabled,
            currentAuthModal: action.actionType == 'registration' ? CURRENT_AUTH_MODAL.UPDATE_PROFILE_NAME : CURRENT_AUTH_MODAL.UPDATE_PROFILE_NAME,
            successMessage: action.message,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.redirectToSaveAddress,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_ADDRESS,
            errorMessage: null,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.updateUserCurrentLocation,
        (state, action) => ({
            ...state,
            currentLocation: action.location,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.updateUserAddress,
        (state, action) => ({
            ...state,
            currentAdress: action.address,
            errorMessage: null,
        })
    ),

    on(
        AuthActions.redirectToSignIn,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.SIGN_IN_WITH_MOBILE,
            errorMessage: null,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.updateErrorMessage,
        (state, action) => ({
            ...state,
            loading: false,
            errorMessage: action.message,
        })
    ),

    on(
        AuthActions.updateContactErrorMessage,
        (state, action) => ({
            ...state,
            loading: false,
            errorMessage: action.message,
            phone: action.phone,
            email: action.email
        })
    ),

    on(
        AuthActions.profileImgaeUploadComplete,
        (state, action) => ({
            ...state,
            loading: false,
            profileError: '',
            picture: action.responseData?.payload ? (action.responseData?.payload.photoUrl ? action.responseData?.payload.photoUrl : '') : '',
            successMessage: 'Profile Image Upload Success'
        })
    ),

    on(
        AuthActions.profileImgaeRemoveComplete,
        (state, action) => ({
            ...state,
            loading: false,
            picture: '',
        })
    ),

    /*
        possibly duplicate
        on(
            AuthActions.redirectToSignIn,
            (state) => ({
                ...state,
                loading: false,
                currentAuthModal: CURRENT_AUTH_MODAL.SIGN_IN_WITH_MOBILE,
                changeCurrentAuthModal: false,
            })
        ),
    */
    on(
        AuthActions.socialLoginHeadsUpStart,
        (state, action) => ({
            ...state,
            authType: action.authType,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.SOCIAL_LOGIN_HEADS_UP_START,
        })
    ),

    on(
        AuthActions.gmailLoginSuccess,
        (state, action) => {
            let closeCurrentAuthModal;
            let currModal;
            if (action.isNewUser) {
                currModal = CURRENT_AUTH_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE;
            } else {
                closeCurrentAuthModal = true;
            }
            return ({
                ...state,
                currentAuthModal: currModal,
                email: action.email,
                name: action.name,
                picture: action.picture,
                closeCurrentAuthModal: closeCurrentAuthModal,
                isEmailDisabled: action.isEmailDisabled
            })
        }
    ),

    on(
        AuthActions.facebookLoginSuccess,
        (state, action) => {
            let closeCurrentAuthModal;
            let currModal;
            if (action.isNewUser) {
                currModal = CURRENT_AUTH_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE;
            } else {
                closeCurrentAuthModal = true;
            }
            return ({
                ...state,
                currentAuthModal: currModal,
                email: action.email,
                name: action.name,
                picture: action.picture,
                closeCurrentAuthModal: closeCurrentAuthModal
            })
        }
    ),




    on(
        AuthActions.redirectToPrifileName,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_NAME,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.redirectToProfileEmailOrPhone,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.redirectToUpdateProfileLocation,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_LOCATION,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.redirectToUpdateProfileImage,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_IMAGE,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.redirectToUpdateProfileAddress,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_ADDRESS,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.redirectToUpdateProfileDobGender,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_DOB_GENDER,
            changeCurrentAuthModal: false,
        })
    ),

    on(
        AuthActions.clearSuccessMessage,
        (state) => ({
            ...state,
            successMessage: null
        })
    ),

    on(
        AuthActions.sendVerificationMobile,
        (state) => ({
            ...state,
            errorMessage: '',
            verificationTransactionId: null
        })
    ),

    on(
        AuthActions.sendVerificationMobileSuccess,
        (state, action) => ({
            ...state,
            successMessage: action.message,
            message: null,
            verificationMobileSent: true,
            loading: false,
            verificationTransactionId: action.verificationTransactionId,
            closeOtpModel: false,
        })
    ),

    on(
        AuthActions.sendVerificationEmail,
        (state) => ({
            ...state,
            errorMessage: '',
            verificationTransactionId: null
        })
    ),

    on(
        AuthActions.sendVerificationEmailSuccess,
        (state, action) => ({
            ...state,
            successMessage: action.message,
            message: null,
            verificationEmailSent: true,
            loading: false,
            verificationTransactionId: action.verificationTransactionId,
            closeOtpModel: false,
        })
    ),

    on(
        AuthActions.verificationDataFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.error
        })
    ),

    on(
        AuthActions.verifyOtpFromMobileSuccess,
        (state) => ({
            ...state,
            successMessage: 'Successfully verified phone',
            errorMessage: null,
            closeOtpModel: true,
            loading: false,
            verificationTransactionId: '',
            isVerified: true,
            authLoader: false,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_NAME,
        })
    ),

    on(
        AuthActions.verifyOtpFromEmailSuccess,
        (state) => ({
            ...state,
            successMessage: 'Successfully verified email',
            closeOtpModel: true,
            loading: false,
            verificationTransactionId: '',
            isVerified: true,
        })
    ),

    on(
        AuthActions.clearEmailVerificationInfo,
        (state) => ({
            ...state,
            closeOtpModel: true,
            loading: false,
            verificationTransactionId: ''
        })
    ),

    on(
        AuthActions.verifyOtpFromEmailFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message
        })
    ),

    on(
        AuthActions.verifyOtpFromMobileFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.message
        })
    ),
    ///////////// Start Auth sign in with email link ////////////
    on(
        AuthActions.signInWithEmailLinkMailSend,
        (state, action) => ({
            ...state,
            email: action.email,
            loading: true,
            phone: null,
            errorMessage: null,
        })
    ),
    on(
        AuthActions.signInWithEmailLinkMailSendSuccess,
        (state, action) => ({
            ...state,
            email: action.email,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.EMAIL_LOGIN_LINK_SEND_SUCCESS,
            errorMessage: null,
        })
    ),
    on(
        AuthActions.signInWithEmailLinkVerify,
        (state, action) => ({
            ...state,
            email: action.email,
            loading: false,
            currentAuthModal: CURRENT_AUTH_MODAL.EMAIL_LOGIN_LINK_VERIFY,
            errorMessage: null,
            userType: null
        })
    ),
    on(
        AuthActions.signInWithEmailLinkVerifySuccess,
        (state, action) => ({
            ...state,
            loading: false,
            isEmailDisabled: action.isEmailDisabled,
            currentAuthModal: CURRENT_AUTH_MODAL.UPDATE_PROFILE_NAME,
            successMessage: action.message,
            errorMessage: null,
            userType: action.userType,
            email: action.email,
            authLoader: false
        })
    ),
    ///////////// End Auth sign in with email link ////////////
    
    on(
        AuthActions.logoutSuccess,
        () => ({
            ...initialAuthState,
            logOutTriggered: true
        })
    ),
    on(
        AuthActions.logoutTriggeredEnd,
        () => ({
            logOutTriggered: false
        })
    )
);

export function authReducer(state: AuthState, action: Action) {
    return _authReducer(state, action);
}
