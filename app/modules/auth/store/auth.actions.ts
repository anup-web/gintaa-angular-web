import { createAction, props } from '@ngrx/store';
import { CurrentLocation, NotificationVerification, UserProfileUpdateRequest } from '../models/auth.model';
import { AddressResponse } from '@gintaa/core/models';
import { AUTH_ACTION_TYPE, CURRENT_AUTH_MODAL } from '../configs/auth.config';

export const showAuthLoader = createAction(
    AUTH_ACTION_TYPE.AUTH_SHOW_LOADER
);

export const hideAuthLoader = createAction(
    AUTH_ACTION_TYPE.AUTH_HIDE_LOADER
);

export const phoneLoginStart = createAction(
    AUTH_ACTION_TYPE.AUTH_PHONE_LOGIN_START,
    props<{ phone: string, userType: string }>()
);

export const emailLoginStart = createAction(
    AUTH_ACTION_TYPE.AUTH_EMAIL_LOGIN_START,
    props<{ email: string, userType: string }>()
);

export const phoneSignupStart = createAction(
    AUTH_ACTION_TYPE.AUTH_PHONE_SIGNUP_START,
    props<{ phone: string }>()
);

export const emailSignupStart = createAction(
    AUTH_ACTION_TYPE.AUTH_EMAIL_SIGNUP_START,
    props<{ email: string }>()
);

export const socialLoginHeadsUpStart = createAction(
    AUTH_ACTION_TYPE.SOCIAL_LOGIN_HEADS_UP_START,
    props<{ authType: string }>()
);

export const gmailLoginStart = createAction(
    AUTH_ACTION_TYPE.AUTH_GMAIL_SIGNUP_START
);

export const gmailLoginSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_GMAIL_LOGIN_SUCCESS,
    props<{ email: string, name: string, picture?: string, isNewUser?: boolean, closeCurrentAuthModal?: boolean | null , isEmailDisabled: boolean}>()
)

export const facebookLoginStart = createAction(
    AUTH_ACTION_TYPE.AUTH_FACEBOOK_SIGNUP_START
);

export const facebookLoginSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_FACEBOOK_LOGIN_SUCCESS,
    props<{ email: string, name: string, picture: string, isNewUser?: boolean, closeCurrentAuthModal?: boolean | null }>()
)

export const logout = createAction(
    AUTH_ACTION_TYPE.AUTH_LOGOUT
);

export const logoutSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_LOGOUT_SUCCESS
);

export const logoutTriggeredEnd = createAction(
    AUTH_ACTION_TYPE.AUTH_LOGOUT_TRIERED_END
);

export const changeCurrentAuthModal = createAction(
    AUTH_ACTION_TYPE.AUTH_CURRENT_AUTH_MODEL,
    props<{ page: CURRENT_AUTH_MODAL }>()
);

export const firebaseAuthSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_FIREBASE_CALL_SUCCESS,
    props<{ response: any, phone: string }>()
);

export const firebaseAuthSuccessEmailPassword = createAction(
    AUTH_ACTION_TYPE.AUTH_EMAIL_PASSWORD_LOGIN_START,
    props<{ message: any, isEmailDisabled: boolean, actionType: string }>()
);

export const firebaseAuthFailure = createAction(
    AUTH_ACTION_TYPE.AUTH_FIREBASE_CALL_FAILURE,
    props<{ error: any }>()
);

export const profileImageError = createAction(
    AUTH_ACTION_TYPE.AUTH_IMAGE_CALL_FAILURE,
    props<{ error: any }>()
);

export const verifyOtpStart = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_OTP_START,
    props<{
        otp: string;
        confirmationResult: any;
        userType: string;
    }>()
);

export const saveFirebaseAuthUser = createAction(
    AUTH_ACTION_TYPE.AUTH_SAVE_FIREBASE_USER,
    props<{
        message: string;
        isPhoneDisabled: boolean;
    }>()
);
export const userLoggedInSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_USER_LOGGED_IN_SUCCESS,
    props<{
        message: string;
        isPhoneDisabled: boolean;
    }>()
);

export const saveFullName = createAction(
    AUTH_ACTION_TYPE.AUTH_SAVE_USER_NAME,
    props<{
        name: string;
    }>()
);

export const saveEmailAndPhone = createAction(
    AUTH_ACTION_TYPE.AUTH_SAVE_USER_CONTACT_INFO,
    props<{
        email: string;
        phone: string;
    }>()
);

export const saveEmailOrPhone = createAction(
    AUTH_ACTION_TYPE.AUTH_SAVE_USER_INFO,
    props<{
        valueType: string;
        value: string;
    }>()
);

export const saveDobAndGender = createAction(
    AUTH_ACTION_TYPE.AUTH_SAVE_USER_PERSONAL_INFO,
    props<{
        dob: string;
        gender: string;
    }>()
);

export const updateUserProfile = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_INFO,
    props<{
        user: UserProfileUpdateRequest;
        from: string;
    }>()
);

export const updateUserProfileSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_INFO_SUCCESS,
    props<{
        user: any;
        message: string;
    }>()
);

export const updateUserProfileFailure = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_INFO_FAILURE,
    props<{
        error: any;
    }>()
);

export const addUserAddress = createAction(
    AUTH_ACTION_TYPE.AUTH_ADD_USER_ADDRESS,
    props<{
        user: UserProfileUpdateRequest;
    }>()
);

export const addUserAddressSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_ADD_USER_ADDRESS_SUCCESS,
    props<{
        address: any;
        message: string;
    }>()
);

export const addUserAddressFailure = createAction(
    AUTH_ACTION_TYPE.AUTH_ADD_USER_ADDRESS_FAILURE,
    props<{
        error: any;
        payload: any;
    }>()
);

export const updateUserProfileNameSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_NAME_SUCCESS,
    props<{
        user: any;
        message: string;
    }>()
);

export const updateUserProfilePhoneEmailSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_PHONE_EMAIL_SUCCESS,
    props<{
        user: any;
        message: string;
    }>()
);

export const updateUserProfileDOBGenderSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_DOB_GENDER_SUCCESS,
    props<{
        user: any;
        message: string;
    }>()
);

export const closeCurrentAuthModal = createAction(
    AUTH_ACTION_TYPE.CLOSE_AUTH_MODAL
);

export const loginEmail = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_EMAIL_LOGIN_INFO,
    props<{
        email: string;
        password: string;
    }>()
);

export const verifyEmailPassword = createAction(
    AUTH_ACTION_TYPE.AUTH_LOGIN_EMAIL_USER_INFO,
    props<{
        email: string;
        password: string;
    }>()
);


export const redirectToSaveAddress = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_SAVE_ADDRESS
);

export const updateUserCurrentLocation = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_LOCATION,
    props<{
        location: CurrentLocation;
    }>()
);

export const updateUserAddress = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_USER_ADDRESS,
    props<{
        address: AddressResponse;
    }>()
);

export const redirectToSignIn = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_SIGN_IN
);

export const updateErrorMessage = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_ERROR_MESSAGE,
    props<{
        message: string;
    }>()
);

export const updateContactErrorMessage = createAction(
    AUTH_ACTION_TYPE.AUTH_UPDATE_CONTACT_ERROR_MESSAGE,
    props<{
        message: string;
        phone: string;
        email: string;
    }>()
);

export const resendOtpStart = createAction(
    AUTH_ACTION_TYPE.AUTH_RESEND_OTP_START,
    props<{
        mobileNotification: NotificationVerification;
    }>()
);

export const profileImageUploadStart = createAction(
    AUTH_ACTION_TYPE.AUTH_PROFILE_IMAGE_UPLOAD_START,
    props<{
        formData: FormData;
    }>()
);

export const profileImgaeUploadComplete = createAction(
    AUTH_ACTION_TYPE.AUTH_PROFILE_IMAGE_UPLOAD_COMPLETE,
    props<{
        responseData: any;
    }>()
);

export const profileImgaeRemoveComplete = createAction(
    AUTH_ACTION_TYPE.AUTH_PROFILE_IMAGE_REMOVE_COMPLETE,
);


export const redirectToPrifileName = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_PROFILE_NAME
);

export const redirectToProfileEmailOrPhone = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_PROFILE_EMAIL_OR_PHONE
);


export const redirectToUpdateProfileLocation = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_UPDATE_PROFILE_LOCATION
);

export const redirectToUpdateProfileAddress = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_UPDATE_PROFILE_ADDRESS
);

export const redirectToUpdateProfileDobGender = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_UPDATE_PROFILE_DOB_GENDER
);

export const redirectToUpdateProfileImage = createAction(
    AUTH_ACTION_TYPE.AUTH_REDIRECT_TO_PROFILE_IMAGE
);

export const checkUserStart = createAction(
    AUTH_ACTION_TYPE.AUTH_CHECK_USER_START,
    props<{ userInfo: string, loginType: string }>()
);

export const fetchProfileData = createAction(
    AUTH_ACTION_TYPE.FETCH_PROFILE_DATA,
);
export const profileDataSuccess = createAction(
    AUTH_ACTION_TYPE.FETCH_PROFILE_DATA_SUCCESS,
    props<{ message: string }>()
);
export const clearSuccessMessage = createAction(
    AUTH_ACTION_TYPE.CLEAR_SUCCESS_MESSAGE,
);


export const sendVerificationMobile = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_OTP_MOBILE,
    props<{
        identifier: string;
        reqBody: any;
    }>()
);

export const sendVerificationMobileSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_OTP_MOBILE_SUCCESS,
    props<{
        verificationTransactionId: string,
        message: string
    }>()
);

export const sendVerificationEmail = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_OTP_EMAIL,
    props<{
        identifier: string;
        reqBody: any;
    }>()
);

export const sendVerificationEmailSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_OTP_EMAIL_SUCCESS,
    props<{
        verificationTransactionId: string,
        message: string
    }>()
);

export const verificationDataFailure = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_OTP_MOBILE_FAILURE,
    props<{
        error: string
    }>()
);

export const verifyOtpFromEmail = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_CHECK_OTP_EMAIL,
    props<{
        transactionId: string;
        otp: string;
    }>()
);

export const verifyOtpFromEmailSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_CHECK_OTP_EMAIL_SUCCESS
);

export const verifyOtpFromEmailFailure = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_CHECK_OTP_EMAIL_FAILURE,
    props<{
        message: string;
    }>()
);

export const verifyOtpFromMobile = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_CHECK_OTP_MOBILE,
    props<{
        transactionId: string;
        otp: string;
    }>()
);

export const verifyOtpFromMobileSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_CHECK_OTP_MOBILE_SUCCESS
);

export const verifyOtpFromMobileFailure = createAction(
    AUTH_ACTION_TYPE.AUTH_VERIFY_CHECK_OTP_MOBILE_FAILURE,
    props<{
        message: string;
    }>()
);

export const clearEmailVerificationInfo = createAction(
    AUTH_ACTION_TYPE.AUTH_CLOSE_VERIFY_CHECK_OTP
);


// export const checkUserSuccess = createAction(
//     AUTH_ACTION_TYPE.AUTH_CHECK_USER_SUCCESS,
//     props<{ email: string, name: string, picture?: string }>()
// )


///////////// Start Auth sign in with email link ////////////
export const signInWithEmailLinkMailSend = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_WITH_EMAIL_LINK_MAIL_SEND,
    props<{ email: string }>()
)

export const signInWithEmailLinkMailSendSuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_WITH_EMAIL_LINK_MAIL_SEND_SUCCESS,
    props<{ email: string }>()
);

export const signInWithEmailLinkVerify = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_WITH_EMAIL_LINK_VERIFY,
    props<{ email: string }>()
);

export const signInWithEmailLinkVerifyStart = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_WITH_EMAIL_LINK_VERIFY_START,
    props<{ email: string, link: string }>()
);


export const signInWithEmailLinkVerifySuccess = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_WITH_EMAIL_LINK_VERIFY_SUCCESS,
    props<{ message: any, isEmailDisabled: boolean, userType: string, email: string }>()
);

export const checkProfileComplete = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_CHECK_IS_PROFILE_COMPLETE,
    props<{ message: any, isEmailDisabled: boolean, userType: string, email: string }>()
);

export const updateTokenAfterRegistration = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_UPDATE_TOKEN_NEW,
    props<{ message: any, isEmailDisabled: boolean, userType: string, email: string }>()
);

export const checkProfileCompleteMobile = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_CHECK_IS_PROFILE_COMPLETE_MOBILE,
    props<{userType: string }>()
);

export const updateTokenAfterRegistrationMobile = createAction(
    AUTH_ACTION_TYPE.AUTH_SIGN_IN_UPDATE_TOKEN_NEW_MOBILE,
    props<{userType: string }>()
);

///////////// End Auth sign in with email link ////////////