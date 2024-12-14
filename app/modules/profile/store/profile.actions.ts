import { createAction, props } from '@ngrx/store';
import { PROFILE_ACTION_TYPE } from '../configs/profile.config';
import {
    AddressResponse,
    UserProfileResponse,
    UserProfileUpdateRequest
} from '@gintaa/modules/profile/models/UserProfileResponse.model';
import { CurrentLocation } from '@gintaa/shared/models/shared.model';

export const showProfileLoader = createAction(
    PROFILE_ACTION_TYPE.PROFILE_SHOW_LOADER
);

export const hideProfileLoader = createAction(
    PROFILE_ACTION_TYPE.PROFILE_HIDE_LOADER
);

export const fetchProfileData = createAction(
    PROFILE_ACTION_TYPE.PROFILE_FETCH
);

export const clearData = createAction(
    PROFILE_ACTION_TYPE.PROFILE_CLEAR
);

export const profileDataSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DATA_SUCCESS,
    props<{
        userInfo: UserProfileResponse
    }>()
);

export const profileDataFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DATA_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchOtherProfileData = createAction(
    PROFILE_ACTION_TYPE.PROFILE_FETCH_OTHER,
    props<{ userId: string }>()
);

export const otherProfileDataSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DATA_OTHER_SUCCESS,
    props<{
        otherUserInfo: UserProfileResponse
    }>()
);

export const otherProfileDataFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DATA_OTHER_FAILURE,
    props<{
        error: any;
    }>()
);

export const profileDataSaveFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DATA_SAVE_FAILURE,
    props<{
        error: any;
        payload: any;
        user: any;
    }>()
);

export const fetchAddressData = createAction(
    PROFILE_ACTION_TYPE.ADDRESS_FETCH
);

export const addressDataSuccess = createAction(
    PROFILE_ACTION_TYPE.ADDRESS_DATA_SUCCESS,
    props<{
        responseData: AddressResponse[];
    }>()
);

export const addressDataFailure = createAction(
    PROFILE_ACTION_TYPE.ADDRESS_DATA_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchOtherAddressData = createAction(
    PROFILE_ACTION_TYPE.ADDRESS_FETCH_OTHER,
    props<{ userId: string }>()
);

export const addressOtherDataSuccess = createAction(
    PROFILE_ACTION_TYPE.ADDRESS_DATA_OTHER_SUCCESS,
    props<{
        responseData: AddressResponse[];
    }>()
);

export const addressOtherDataFailure = createAction(
    PROFILE_ACTION_TYPE.ADDRESS_DATA_OTHER_FAILURE,
    props<{
        error: any;
    }>()
);

export const navigateProfileScreen = createAction(
    PROFILE_ACTION_TYPE.PROFILE_NAVIGATE_SCREEN,
    props<{
        currentScreen: string
    }>()
);

export const profileImageUploadStart = createAction(
    PROFILE_ACTION_TYPE.PROFILE_IMAGE_UPLOAD,
    props<{
        formData: FormData;
    }>()
);

export const profileImgaeUploadComplete = createAction(
    PROFILE_ACTION_TYPE.PROFILE_IMAGE_UPLOAD_COMPLETE,
    props<{
        responseData: any;
    }>()
);

export const removePhotoUrl = createAction(
    PROFILE_ACTION_TYPE.REMOVE_PHOTO_URL
);

export const updateUserProfile = createAction(
    PROFILE_ACTION_TYPE.PROFILE_UPDATE_USER_INFO,
    props<{
        user: UserProfileUpdateRequest
    }>()
);

export const updateUserProfileSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_UPDATE_USER_INFO_SUCCESS,
    props<{
        user: any;
        message: string;
    }>()
);

export const updateUserCurrentLocation = createAction(
    PROFILE_ACTION_TYPE.PROFILE_UPDATE_USER_LOCATION,
    props<{
        location: CurrentLocation;
    }>()
);

export const updateUserAddress = createAction(
    PROFILE_ACTION_TYPE.PROFILE_UPDATE_USER_ADDRESS,
    props<{
        address: AddressResponse;
    }>()
);

export const addUserAddress = createAction(
    PROFILE_ACTION_TYPE.PROFILE_ADD_USER_ADDRESS,
    props<{
        address: AddressResponse;
    }>()
);

export const addUserAddressSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_ADD_USER_ADDRESS_SUCCESS,
    props<{
        address: any;
        message: string;
    }>()
);

export const addUserAddressFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_ADD_USER_ADDRESS_FAILURE,
    props<{
        error: any;
        payload: any
    }>()
);

export const editUserAddress = createAction(
    PROFILE_ACTION_TYPE.PROFILE_EDIT_USER_ADDRESS,
    props<{
        address: AddressResponse;
        addressId: string
    }>()
);

export const editUserAddressSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_EDIT_USER_ADDRESS_SUCCESS,
    props<{
        address: any;
        message: string;
    }>()
);

export const editUserAddressFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_EDIT_USER_ADDRESS_FAILURE,
    props<{
        error: any;
        payload: any
    }>()
);

export const deleteAddressData = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DELETE_USER_ADDRESS,
    props<{
        addressId: string;
    }>()
);

export const deleteUserAddressSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DELETE_USER_ADDRESS_SUCCESS,
    props<{
        message: string;
    }>()
);

export const deleteUserAddressFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DELETE_USER_ADDRESS_FAILURE,
    props<{
        error: any;
    }>()
);

export const setDefaultAddress = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DEFAULT_USER_ADDRESS,
    props<{
        address: AddressResponse;
        addressId: string
    }>()
);

export const setDefaultAddressSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DEFAULT_USER_ADDRESS_SUCCESS,
    props<{
        message: string;
    }>()
);

export const setDefaultAddressFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_DEFAULT_USER_ADDRESS_FAILURE,
    props<{
         error: any;
    }>()
);

export const sendVerificationEmail = createAction(
    PROFILE_ACTION_TYPE.PROFILE_SEND_VERIFICATION_EMAIL,
    props<{
        identifier: string;
        reqBody: any;
    }>()
);

export const sendVerificationEmailSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_SEND_VERIFICATION_EMAIL_SUCCESS,
    props<{
        verificationTransactionId: string,
        message: string
    }>()
);

export const verifyOtpFromEmail = createAction(
    PROFILE_ACTION_TYPE.PROFILE_VERIFY_OTP_EMAIL,
    props<{
        transactionId: string;
        otp: string;
        email: string;
    }>()
);

export const verifyOtpFromEmailSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_VERIFY_OTP_EMAIL_SUCCESS
);

export const verifyOtpFromEmailFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_VERIFY_OTP_EMAIL_FAILURE,
    props<{
        message: string;
    }>()
);

export const clearEmailVerificationInfo = createAction(
    PROFILE_ACTION_TYPE.PROFILE_CLEAR_VERIFICATION_INFO
);

export const sendVerificationMobile = createAction(
    PROFILE_ACTION_TYPE.PROFILE_SEND_VERIFICATION_MOBILE,
    props<{
        identifier: string;
        reqBody: any;
    }>()
);

export const sendVerificationMobileSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_SEND_VERIFICATION_MOBILE_SUCCESS,
    props<{
        verificationTransactionId: string,
        message: string
    }>()
);

export const verifyOtpFromMobile = createAction(
    PROFILE_ACTION_TYPE.PROFILE_VERIFY_OTP_MOBILE,
    props<{
        transactionId: string;
        otp: string;
        phone: string;
    }>()
);

export const verifyOtpFromMobileSuccess = createAction(
    PROFILE_ACTION_TYPE.PROFILE_VERIFY_OTP_MOBILE_SUCCESS
);

export const verifyOtpFromMobileFailure = createAction(
    PROFILE_ACTION_TYPE.PROFILE_VERIFY_OTP_MOBILE_FAILURE,
    props<{
        message: string;
    }>()
);

export const opendAddressModal = createAction(
    PROFILE_ACTION_TYPE.PROFILE_ADDRESS_MODAL_OPEN
);

export const closedAddressModal = createAction(
    PROFILE_ACTION_TYPE.PROFILE_ADDRESS_MODAL_CLOSE
);

// general profile loader helper
export const profileLoading = createAction(
    PROFILE_ACTION_TYPE.PROFILE_LOADING
);

export const profileLoaded = createAction(
    PROFILE_ACTION_TYPE.PROFILE_LOADED
);

export const fetchUserOffer = createAction(
    PROFILE_ACTION_TYPE.FETCH_USER_OFFER,
    props<{ userId: string }>()
);

export const fetchUserOfferFailure = createAction(
    PROFILE_ACTION_TYPE.FETCH_USER_OFFER_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchUserOfferSuccess = createAction(
    PROFILE_ACTION_TYPE.FETCH_USER_OFFER_SUCCESS,
    props<{
        responseData: any[];
    }>()
);


export const fetchUserFeedBack = createAction(
    PROFILE_ACTION_TYPE.FETCH_USER_FEEDBACK,
    props<{ queryString: string, userId: string }>()
);

export const fetchUserFeedBackFailure = createAction(
    PROFILE_ACTION_TYPE.FETCH_USER_FEEDBACK_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchUserFeedBackSuccess = createAction(
    PROFILE_ACTION_TYPE.FETCH_USER_FEEDBACK_SUCCESS,
    props<{
        responseData: any[];
    }>()
);

export const updateToken = createAction(
    PROFILE_ACTION_TYPE.UPDATE_FIREBASE_TOKEN
);
