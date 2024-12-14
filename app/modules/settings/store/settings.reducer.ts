import { Action, createReducer, on } from '@ngrx/store';
import { CURRENT_SETTINGS_MODAL } from '../configs/settings.config';
import { SettingsState } from '../models/settings.model';
import { SettingsActions } from './settings-types';

export const initialSettingsState: SettingsState = {
    currentAuthModal: null, //CURRENT_SETTINGS_MODAL.CHANGE_PHONE_NUMBER || null,
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
    loading: false,
    authType: null,
    picture: null,
    changeCurrentAuthModal: false,
    userType:'new_user',
    newEmail: null,
    newPhone: null,
    verificationTransactionId: null,
    currentEmail: null,
    currentPhone: null,
    tradeNotificationTabs: [],
    blockUserCount: null,
    blockUserList: []
};

const _settingsReducer = createReducer(
    initialSettingsState,

    // on(
    //     SettingsActions.logout,
    //     () => ({
    //         ...initialSettingsState
    //     //   ...state,
    //     //   loading: false,
    //     //   user: null,
    //     //   errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.firebaseAuthSuccess,
    //     (state, action) => ({
    //         ...state,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.VERIFY_OTP_WITH_MOBILE,
    //         loading: false,
    //         successMessage: 'OTP Sent Success',
    //         errorMessage: null,
    //         firebaseResponse: action?.response,
    //         otpSent: true,
    //         phone: action.phone,
    //         authType: 'mobile'
    //     })
    // ),

    on(
        SettingsActions.firebaseAuthFailure,
        (state, action) => ({
            ...state,
            loading: false,
            errorMessage: action.error
        })
    ),

    on(
        SettingsActions.settingFalior,
        (state, action) => ({
            ...state,
            loading: false,
            errorMessage: action.error.error.message
        })
    ),

    on(
        SettingsActions.changeCurrentAuthModal,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: action.page,
            phone: null,
            errorMessage: null,
        })
    ),

    // on(
    //     SettingsActions.saveFirebaseAuthUser,
    //     (state, action) => ({
    //         ...state,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_NAME,
    //         isPhoneDisabled: action.isPhoneDisabled,
    //         loading: false,
    //         successMessage: action.message,
    //         otpVerified: true,
    //         errorMessage: null,
    //     })
    // ),
    // on(
    //     SettingsActions.userLoggedInSuccess,
    //     (state, action) => ({
    //         ...state,
    //         successMessage: action.message,
    //         loading: false,
    //         errorMessage: null,
    //         changeCurrentAuthModal: true,
    //         otpVerified: true,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_ADDRESS,
    //     })
    // ),
    // on(
    //     SettingsActions.saveFullName,
    //     (state, action) => ({
    //         ...state,
    //         name: action.name,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.saveEmailAndPhone,
    //     (state, action) => ({
    //         ...state,
    //         email: action.email,
    //         phone: action.phone,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_DOB_GENDER,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.saveDobAndGender,
    //     (state, action) => ({
    //         ...state,
    //         dob: action.dob,
    //         gender: action.gender,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_LOCATION,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.updateUserProfileSuccess,
    //     (state, action) => ({
    //         ...state,
    //         name: action.user.name,
    //         successMessage: action.message,
    //         loading: false,
    //         errorMessage: null,
    //         changeCurrentAuthModal: true,
    //         dob: action.user.dob ? action.user.dob : state.dob,
    //     })
    // ),

    on(
        SettingsActions.updateUserProfileFailure,
        (state, action) => ({
            ...state,
            errorMessage: action.error,
            loading: false,
        })
    ),

    // on(
    //     SettingsActions.emailLoginStart,
    //     (state, action) => ({
    //         ...state,
    //         email: action.email,
    //         loading: false,
    //         userType: action.userType,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_PASSWORD,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.phoneLoginStart,
    //     (state, action) => ({
    //         ...state,
    //         userType: action.userType,
    //     })
    // ),
    // on(
    //     SettingsActions.checkUserStart,
    //     (state, action) => ({
    //         ...state,
    //         phone: action.loginType == 'phone' ? action.userInfo : null,
    //         email: action.loginType == 'email' ? action.userInfo : null,
    //     })
    // ),
    // on(
    //     SettingsActions.firebaseAuthSuccessEmailPassword,
    //     (state, action) => ({
    //         ...state,
    //         loading: false,
    //         isEmailDisabled: action.isEmailDisabled,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_NAME,
    //         successMessage: action.message,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.redirectToSaveAddress,
    //     (state, action) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_ADDRESS,
    //         errorMessage: null,
    //         changeCurrentAuthModal: false,
    //     })
    // ),

    // on(
    //     SettingsActions.updateUserCurrentLocation,
    //     (state, action) => ({
    //         ...state,
    //         currentLocation: action.location,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.updateUserAddress,
    //     (state, action) => ({
    //         ...state,
    //         currentAdress: action.address,
    //         errorMessage: null,
    //     })
    // ),

    // on(
    //     SettingsActions.redirectToSignIn,
    //     (state) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.SIGN_IN_WITH_MOBILE,
    //         errorMessage: null,
    //         changeCurrentAuthModal: false,
    //     })
    // ),

    on(
        SettingsActions.updateErrorMessage,
        (state, action) => ({
            ...state,
            loading: false,
            errorMessage: action.message,
        })
    ),

    // on(
    //     SettingsActions.updateContactErrorMessage,
    //     (state, action) => ({
    //         ...state,
    //         loading: false,
    //         errorMessage: action.message,
    //         phone: action.phone,
    //         email: action.email
    //     })
    // ),

    // on(
    //     SettingsActions.profileImgaeUploadComplete,
    //     (state, action) => ({
    //         ...state,
    //         loading: false,
    //         picture: action.responseData?.payload ? (action.responseData?.payload.images ? action.responseData?.payload.images[0]['url'] : '') :'',
    //         successMessage: 'Profile Image Upload Success'
    //     })
    // ),

/*
    possibly duplicate
    on(
        SettingsActions.redirectToSignIn,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.SIGN_IN_WITH_MOBILE,
            changeCurrentAuthModal: false,
        })
    ),
*/
    // on(
    //     SettingsActions.socialLoginHeadsUpStart,
    //     (state,action) => ({
    //         ...state,
    //         authType: action.authType,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.SOCIAL_LOGIN_HEADS_UP_START,
    //     })
    // ),

    // on(
    //     SettingsActions.gmailLoginSuccess,
    //     (state,action)=> ({
    //         ...state,
    //        currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_NAME,
    //        email: action.email,
    //        name: action.name,
    //        picture: action.picture,
    //     })
    // ),

    // on(
    //     SettingsActions.facebookLoginSuccess,
    //     (state,action)=> ({
    //         ...state,
    //        currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_NAME,
    //        email: action.email,
    //        name: action.name,
    //        picture: action.picture,
    //     })
    // ),




    // on(
    //     SettingsActions.redirectToPrifileName,
    //     (state) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_NAME,
    //         changeCurrentAuthModal: false,
    //     })
    // ),



    // on(
    //     SettingsActions.redirectToProfileEmailOrPhone,
    //     (state) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_EMAIL_OR_PHONE,
    //         changeCurrentAuthModal: false,
    //     })
    // ),

    // on(
    //     SettingsActions.redirectToUpdateProfileLocation,
    //     (state) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_LOCATION,
    //         changeCurrentAuthModal: false,
    //     })
    // ),

    // on(
    //     SettingsActions.redirectToUpdateProfileAddress,
    //     (state) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_ADDRESS,
    //         changeCurrentAuthModal: false,
    //     })
    // ),

    // on(
    //     SettingsActions.redirectToUpdateProfileDobGender,
    //     (state) => ({
    //         ...state,
    //         loading: false,
    //         currentAuthModal: CURRENT_SETTINGS_MODAL.UPDATE_PROFILE_DOB_GENDER,
    //         changeCurrentAuthModal: false,
    //     })
    // ),

    on(
        SettingsActions.redirectToChangePassword,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_PASSWORD,
            changeCurrentAuthModal: false,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.redirectToResetPassword,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.RESET_PASSWORD,
            changeCurrentAuthModal: false,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.redirectToResetPasswordMailSend,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.RESET_PASSWORD_MAIL_SEND,
            changeCurrentAuthModal: false,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.redirectToResetPasswordConfirm,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.RESET_PASSWORD_CONFIRM,
            errorMessage: null,
            successMessage: null
        })
    ),

    on(
        SettingsActions.resetPasswordResponseMessage,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.RESET_PASSWORD_SUCCESS,
            successMessage: action.message,
            errorMessage: null,
        })
    ),

    on(
        SettingsActions.updateEmailResponseMessage,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_EMAIL_VERIFY_SUCCESS,
            successMessage: action.message,
            currentEmail: action.email,
            errorMessage: null,
        })
    ),

    on(
        SettingsActions.redirectToChangeEmail,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_EMAIL,
            changeCurrentAuthModal: false,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.redirectToEmailChangeEmailNewEmail,
        (state) => ({
            ...state,
            loading: false,
            // changeCurrentAuthModal: false,
            errorMessage: null,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_EMAIL_ENTER_NEW_EMAIL
        })
    ),

    on(
        SettingsActions.redirectToChangeEmailOtpVerification,
        (state, action) => ({
            ...state,
            newEmail: action.newEmail,
            // phone: action.phoneNumber,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_EMAIL_OTP_VERIFICATION,
            verificationTransactionId: action.verificationTransactionId,
            successMessage: null,
            errorMessage: null,
        })
    ),

    on(
        SettingsActions.redirectTOChangeEmailVerifySuccess,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_EMAIL_VERIFY_SUCCESS,
            changeCurrentAuthModal: false,
        })
    ),
    

    on(
        SettingsActions.redirectToChangePhoneNumber,
        (state) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_PHONE_NUMBER,
            changeCurrentAuthModal: false,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.redirectToChangeMobileOtpVerificationScreen,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_PHONE_NUMBER_OTP_VERIFICATION,
            verificationTransactionId: action.verificationTransactionId,
            newPhone: action.newMobile,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.redirectTOChangeMobileVerifySuccess,
        (state, action) => ({
            ...state,
            loading: false,
            currentAuthModal: CURRENT_SETTINGS_MODAL.CHANGE_PHONE_NUMBER_SUCCESS,
            errorMessage: null
        })
    ),

    on(
        SettingsActions.getProfileDataSuccess,
        (state, action) => ({
            ...state,
            currentEmail: action.userEmail,
            currentPhone: action.userPhone
        })
    ),

    on(
        SettingsActions.geAllNotificationSettings,
        (state, action) => ({
            ...state,
            loading: true
        })
    ),

    on(
        SettingsActions.geAllNotificationSettingsSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            tradeNotificationTabs: action.tradeNotificationTabs
        })
    ),

    on(
        SettingsActions.fetchBlockUserCountSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            blockUserCount: action.blockUserCount
        })
    ),

    on(
        SettingsActions.fetchBlockUserListSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            blockUserList: action.blockUserList
        })
    ),

    on(
        SettingsActions.changeEmailError,
        (state, action) => ({
            ...state,
            loading: false,
            successMessage: null,
            errorMessage: action.errorMessage
        })
    ),


    // on(
    //     SettingsActions.fetchProfileDataSuccess,
    //     (state, action) => ({
    //       ...state,
    //       loading: false,
    //       userInfo: {
    //         ...state.userInfo,
    //         ...action.userInfo
    //       },
    //       errorMessage: null,
    //     })
    //   ),

);

export function settingsReducer(state: SettingsState, action: Action) {
    return _settingsReducer(state, action);
}