import { createAction, props } from '@ngrx/store';
import { blockUser, CurrentLocation, NotificationTab, NotificationVerification, UserProfileUpdateRequest } from '../models/settings.model';
import { AddressResponse, UserProfileResponse } from '@gintaa/core/models';
import { SETTINGS_ACTION_TYPE, CURRENT_SETTINGS_MODAL } from '../configs/settings.config';


// export const phoneLoginStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_PHONE_LOGIN_START,
//     props<{ phone: string, userType: string}>()
// );

// export const emailLoginStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_EMAIL_LOGIN_START,
//     props<{ email: string, userType: string }>()
// );

// export const phoneSignupStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_PHONE_SIGNUP_START,
//     props<{ phone: string }>()
// );

// export const emailSignupStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_EMAIL_SIGNUP_START,
//     props<{ email: string }>()
// );

// export const socialLoginHeadsUpStart = createAction(
//    SETTINGS_ACTION_TYPE.SOCIAL_LOGIN_HEADS_UP_START,
//    props<{ authType: string }>()
// );

// export const gmailLoginStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_GMAIL_SIGNUP_START
// );

// export const gmailLoginSuccess = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_GMAIL_LOGIN_SUCCESS,
//     props<{ email: string, name: string, picture?: string }>()
// )

// export const facebookLoginStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_FACEBOOK_SIGNUP_START
// );

// export const facebookLoginSuccess = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_FACEBOOK_LOGIN_SUCCESS,
//     props<{ email: string, name: string, picture: string }>()
// )

// export const logout = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_LOGOUT
// );

export const changeCurrentAuthModal = createAction(
    SETTINGS_ACTION_TYPE.AUTH_CURRENT_AUTH_MODEL,
    props<{ page: CURRENT_SETTINGS_MODAL }>()
);

// export const firebaseAuthSuccess = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_FIREBASE_CALL_SUCCESS,
//     props<{ response: any, phone: string }>()
// );

// export const firebaseAuthSuccessEmailPassword = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_EMAIL_PASSWORD_LOGIN_START,
//     props<{ message: any, isEmailDisabled: boolean }>()
// );

export const firebaseAuthFailure = createAction(
    SETTINGS_ACTION_TYPE.AUTH_FIREBASE_CALL_FAILURE,
    props<{ error: any }>()
);

export const settingFalior = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_CALL_FAILURE,
    props<{ error: any }>()
);


// export const verifyOtpStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_VERIFY_OTP_START,
//     props<{
//         otp: string;
//         confirmationResult: any;
//         userType: string;
//     }>()
// );

// export const saveFirebaseAuthUser = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_SAVE_FIREBASE_USER,
//     props<{
//         message: string;
//         isPhoneDisabled: boolean;
//     }>()
// );
// export const userLoggedInSuccess = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_USER_LOGGED_IN_SUCCESS,
//     props<{
//         message: string;
//         isPhoneDisabled: boolean;
//     }>()
// );

// export const saveFullName = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_SAVE_USER_NAME,
//     props<{
//         name: string;
//     }>()
// );

// export const saveEmailAndPhone = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_SAVE_USER_CONTACT_INFO,
//     props<{
//         email: string;
//         phone: string;
//     }>()
// );

// export const saveDobAndGender = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_SAVE_USER_PERSONAL_INFO,
//     props<{
//         dob: string;
//         gender: string;
//     }>()
// );

export const updateUserProfile = createAction(
    SETTINGS_ACTION_TYPE.AUTH_UPDATE_USER_INFO,
    props<{
        user: UserProfileUpdateRequest
    }>()
);

// export const updateUserProfileSuccess = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_UPDATE_USER_INFO_SUCCESS,
//     props<{
//         user: any;
//         message: string;
//     }>()
// );

export const updateUserProfileFailure = createAction(
    SETTINGS_ACTION_TYPE.AUTH_UPDATE_USER_INFO_FAILURE,
    props<{
        error: any;
    }>()
);

// export const loginEmail = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_VERIFY_EMAIL_LOGIN_INFO,
//     props<{
//         email: string;
//         password: string;
//     }>()
// );

// export const verifyEmailPassword = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_LOGIN_EMAIL_USER_INFO,
//     props<{
//         email: string;
//         password: string;
//     }>()
// );


// export const redirectToSaveAddress = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_SAVE_ADDRESS
// );

// export const updateUserCurrentLocation = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_UPDATE_USER_LOCATION,
//     props<{
//         location: CurrentLocation;
//     }>()
// );

// export const updateUserAddress = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_UPDATE_USER_ADDRESS,
//     props<{
//         address: AddressResponse;
//     }>()
// );

// export const redirectToSignIn = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_SIGN_IN
// );

export const updateErrorMessage = createAction(
    SETTINGS_ACTION_TYPE.AUTH_UPDATE_ERROR_MESSAGE,
    props<{
        message: string;
    }>()
);

// export const updateContactErrorMessage = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_UPDATE_CONTACT_ERROR_MESSAGE,
//     props<{
//         message: string;
//         phone: string;
//         email: string;
//     }>()
// );

// export const resendOtpStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_RESEND_OTP_START,
//     props<{
//         mobileNotification: NotificationVerification;
//     }>()
// );

// export const profileImageUploadStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_PROFILE_IMAGE_UPLOAD_START,
//     props<{
//         formData: FormData;
//     }>()
// );

// export const profileImgaeUploadComplete = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_PROFILE_IMAGE_UPLOAD_COMPLETE,
//     props<{
//         responseData: any;
//     }>()
// );

// export const redirectToPrifileName = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_PROFILE_NAME
// );

// export const redirectToProfileEmailOrPhone = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_PROFILE_EMAIL_OR_PHONE
// );


// export const redirectToUpdateProfileLocation = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_UPDATE_PROFILE_LOCATION
// );

// export const redirectToUpdateProfileAddress = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_UPDATE_PROFILE_ADDRESS
// );


// export const redirectToUpdateProfileDobGender = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_REDIRECT_TO_UPDATE_PROFILE_DOB_GENDER
// );

// export const checkUserStart = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_CHECK_USER_START,
//     props<{ userInfo: string, loginType: string }>()
// );

export const fetchProfileData = createAction(
    SETTINGS_ACTION_TYPE.FETCH_PROFILE_DATA,
);
export const profileDataSuccess = createAction(
    SETTINGS_ACTION_TYPE.FETCH_PROFILE_DATA_SUCCESS,
    props<{ message: string }>()
);


export const redirectToChangePassword = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_PASSWORD
);
export const redirectToResetPassword = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_RESET_PASSWORD
);
export const redirectToResetPasswordMailSend = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_RESET_PASSWORD_MAIL_SEND
);
export const redirectToResetPasswordConfirm = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_RESET_PASSWORD_CONFIRM
);


export const redirectToChangeEmail = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_EMAIL
);

export const redirectToEmailChangeEmailNewEmail = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_EMAIL_NEW_Email
);





export const resetPasswordMailSend = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_PASSWORD_MAIL_SEND,
    props<{ email: string }>()
);

export const confirmResetPassword = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_CONFIRM_RESET_PASSWORD,
    props<{ oobCode: string, password: string }>()
);

export const resetPasswordResponseMessage = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_RESET_PASSWORD_RESPONSE_MESSAGE,
    props<{ message: any }>()
);

export const updateEmailResponseMessage = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_RESET_PASSWORD_RESPONSE_MESSAGE,
    props<{ email: string, message: any }>()
);


export const sendEmailOtpForChangeEmail = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_CHECK_EMAIL_INITIATE,
    props<{ email: string }>()
);


export const verifyOtpFromEmail = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_VERIFY_OTP_FOR_EMAIL,
    props<{ email: string, verificationTransactionId: string, otp: string }>()
);

export const redirectToChangeEmailOtpVerification = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_EMAIL_OTP_VERIFICATION,
    props<{ newEmail: string, verificationTransactionId: string }>()
);

export const confirmUpdateEmail = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_CONFIRM_UPDATE_EMAIL,
    props<{ newEmail: string, phone: string, displayName: string}>()
    // , user: UserProfileUpdateRequest
);

export const redirectTOChangeEmailVerifySuccess = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_EMAIL_VERIFY_SUCCESS
);



export const checkEmailPassword = createAction(
    SETTINGS_ACTION_TYPE.AUTH_VERIFY_EMAIL_LOGIN_INFO,
    props<{
        email: string;
        password: string;
        requestFor: string;
    }>()
);




export const redirectToChangePhoneNumber = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_PHONE_NUMBER
);



export const sendMobileOtpForChangeMobile = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_CHECK_MOBILE_INITIATE,
    props<{ mobile: string }>()
);


export const redirectToChangeMobileOtpVerificationScreen = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_MOBILE_OTP_VERIFICATION_SCREEN,
    props<{ newMobile: string, verificationTransactionId: string }>()
);


export const verifyOtpFromPhone = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_VERIFY_OTP_FOR_MOBILE,
    props<{ verificationTransactionId: string, otp: string }>()
);


export const redirectTOChangeMobileVerifySuccess = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_REDIRECT_TO_CHANGE_MOBILE_OTP_VERIFICATION_SUCCESS_SCREEN
);


export const getProfileData = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_GET_PROFILE_DATA
);

export const getProfileDataSuccess = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_GET_PROFILE_DATA_SUCCESS,
    props<{ userPhone: string , userEmail: string }>()
);


////////////////////// start trade-notification ////////////////////////////
export const geAllNotificationSettings = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_FETCH_NOTIFICATION_SETTINGS_LIST
);


export const geAllNotificationSettingsSuccess = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_FETCH_NOTIFICATION_SETTINGS_LIST_SUCCESS,
    props<{ tradeNotificationTabs: NotificationTab[] }>()
);
////////////////////// End trade-notification ////////////////////////////

////////////////////// start block list ////////////////////////////
export const fetchBlockUserCount = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_FETCH_BLOCK_LIST_COUNT
);

export const fetchBlockUserCountSuccess = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_FETCH_BLOCK_LIST_COUNT_SUCCESS,
    props<{ blockUserCount: number }>()
);

export const fetchBlockUserList = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_FETCH_BLOCK_LIST
);

export const fetchBlockUserListSuccess = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_FETCH_BLOCK_LIST_SUCCESS,
    props<{ blockUserList: blockUser[] }>()
);

////////////////////// End block list ////////////////////////////



export const changeEmailError = createAction(
    SETTINGS_ACTION_TYPE.SETTINGS_CHANGE_EMAIL_ERROR,
    props<{ errorMessage: string }>()
);


// export const fetchProfileDataSuccess = createAction(
//     SETTINGS_ACTION_TYPE.RECEIVE_PROFILE_DATA_SUCCESS,
//     props<{
//         userInfo: UserProfileResponse
//     }>()
// );

// 

// export const checkUserSuccess = createAction(
//     SETTINGS_ACTION_TYPE.AUTH_CHECK_USER_SUCCESS,
//     props<{ email: string, name: string, picture?: string }>()
// )