import { Action, createReducer, on } from '@ngrx/store';
import { CURRENT_PROFILE_SCREEN } from '../configs/profile.config';
import { UserProfileState } from '../models/UserProfileState.model';
import { ProfileActions } from './action-types';
import { UserProfileResponse, OtherUserProfileResponse } from '@gintaa/modules/profile/models/UserProfileResponse.model';
import localization from '@gintaa/config/localization';

export const initialProfileState: UserProfileState = {
  loading: true,
  profileLoader: false,
  feedbackLoading: true,
  addressLoading: true,
  currentProfileScreen: CURRENT_PROFILE_SCREEN.VIEW_PROFILE || null,
  userInfo: new UserProfileResponse(),
  otherUserInfo: new OtherUserProfileResponse(),
  currentLocation: null,
  currentAdress: null,
  closeOpenedModel: false,
  addEditAddressStatus: '',
  message: '',
  payloadValidation: '',
  verificationTransactionId: '',
  verificationEmailSent: false,
  emailVerificationFailed: false,
  verificationMobileSent: false,
  mobileVerificationFailed: false,
  profileUpdated: '',
  userAllOffers: [],
  userAllFeedback: [],
};

const _profileReducer = createReducer(

  initialProfileState,

  on(
    ProfileActions.showProfileLoader,
    (state) => ({
      ...state,
      profileLoader: true
    })
  ),
  on(
    ProfileActions.hideProfileLoader,
    (state) => ({
      ...state,
      profileLoader: false
    })
  ),
  on(
    ProfileActions.fetchProfileData,
    (state) => ({
      ...state,
      loading: true,
      userInfo: null,
      profileUpdated: '',
      errorMessage: null,
    })
  ),
  on(
    ProfileActions.clearData,
    (state) => ({
      ...state,
      loading: true,
      userInfo: null,
      profileUpdated: '',
      errorMessage: null,
    })
  ),
  on(
    ProfileActions.profileDataSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      profileLoader: false,
      userInfo: {
        imageUpload: false,
        ...state.userInfo,
        ...action.userInfo
      },
      errorMessage: null,
    })
  ),
  on(
    ProfileActions.fetchOtherProfileData,
    (state) => ({
      ...state,
      loading: true,
      otherUserInfo: null,
      profileUpdated: '',
      errorMessage: null,
    })
  ),

  on(
    ProfileActions.otherProfileDataSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      otherUserInfo: {
        ...state.otherUserInfo,
        ...action.otherUserInfo
      },
      errorMessage: null,
    })
  ),

  on(
    ProfileActions.navigateProfileScreen,
    (state, action) => ({
      ...state,
      currentProfileScreen: action.currentScreen,
    })
  ),
  on(
    ProfileActions.profileImageUploadStart,
    (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo,
        imageUpload: false
      },
      isImgLoading: true,
    })
  ),
  on(
    ProfileActions.profileImgaeUploadComplete,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: localization.user.USER_IMAGE_UPLOAD_SUCCESS,
      errorMessage: null,
      message: null,
      userInfo: {
        ...state.userInfo,
        imageUpload: true,
        photoUrl: action.responseData?.photoUrl ? action.responseData.photoUrl : state.userInfo.photoUrl
      },
      isImgLoading: false,
    })
  ),

  on(
    ProfileActions.removePhotoUrl,
    (state) => ({
      ...state,
      loading: false,
      userInfo: {
        ...state.userInfo,
        photoUrl: null,
      }
    })
  ),

  on(
    ProfileActions.updateUserProfile,
    (state, action) => ({
      ...state,
      loading: true,
      profileUpdated: ''
    })
  ),
  on(
    ProfileActions.updateUserProfileSuccess,
    (state, action) => ({
      ...state,
      successMessage: action.message,
      loading: false,
      profileUpdated: 'success',
      errorMessage: null,
      userInfo: action.user?.displayName ? {
        ...state.userInfo,
        displayName: action.user.displayName,
        gender: action.user.gender,
        dob: action.user.dob,
        imageUpload: false
      } : {
        ...state.userInfo
      }
    })
  ),

  on(
    ProfileActions.addressDataSuccess,
    (state, action) => ({
      ...state,
      addressLoading: false,
      profileLoader: false,
      errorMessage: null,
      userInfo: {
        ...state.userInfo,
        address: action.responseData
      }
    })
  ),

  on(
    ProfileActions.addressOtherDataSuccess,
    (state, action) => ({
      ...state,
      addressLoading: false,
      errorMessage: null,
      otherUserInfo: {
        ...state.otherUserInfo,
        address: action.responseData
      }
    })
  ),

  on(
    ProfileActions.setDefaultAddressFailure,
    (state, action) => ({
      ...state,
      addressLoading: false,
      profileLoader: false,
      errorMessage: action.error?.error?.message ? action.error.error.message : localization.user.DEFAULT_ADDRESS_FAILED,
    })
  ),

  on(
    ProfileActions.setDefaultAddressSuccess,
    (state, action) => ({
      ...state,
      addressLoading: false,
    //  errorMessage: action.error?.error?.message ? action.error.error.message : localization.user.DEFAULT_ADDRESS_FAILED,
    })
  ),

  on(
    ProfileActions.updateUserCurrentLocation,
    (state, action) => ({
      ...state,
      currentLocation: action.location,
      errorMessage: null,
    })
  ),

  on(
    ProfileActions.updateUserAddress,
    (state, action) => ({
      ...state,
      currentAdress: action.address,
      errorMessage: null,
    })
  ),

  on(
    ProfileActions.opendAddressModal,
    (state, action) => ({
      ...state,
      closeOpenedModel: false,
      errorMessage: null,
      message: null,
      currentLocation: null,
      currentAdress: null,
      payloadValidation: [],
      //profileLoader: false
    })
  ),

  on(
    ProfileActions.closedAddressModal,
    (state, action) => ({
      ...state,
      closeOpenedModel: true,
      errorMessage: null,
      message: null,
      currentLocation: null,
      currentAdress: null,
      payloadValidation: []
    })
  ),

  on(
    ProfileActions.addUserAddressSuccess,
    (state, action) => ({
      ...state,
      closeOpenedModel: true,
      successMessage: localization.user.USER_ADDRESS_ADD_SUCCESS,
      errorMessage: null,
      userInfo: {
        ...state.userInfo,
        address: state.userInfo.address ? [...state.userInfo.address, action.address] : [action.address]
      }
    })
  ),

  on(
    ProfileActions.addUserAddressFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      closeOpenedModel: false,
      message: action.error,
      payloadValidation: action.payload ? action.payload : [],
      addEditAddressStatus: 'failed'
    })
  ),

  on(
    ProfileActions.editUserAddressSuccess,
    (state, action) => ({
      ...state,
      closeOpenedModel: true,
      successMessage: localization.user.USER_ADDRESS_EDIT_SUCCESS,
      errorMessage: null,
      userInfo: {
        ...state.userInfo,
        address: state.userInfo.address ? [...state.userInfo.address.filter((ad) => ad.id !== action.address.id), action.address] : [action.address]
      }
    })
  ),

  on(
    ProfileActions.editUserAddressFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      message: action.error,
      payloadValidation: action.payload ? action.payload : [],
      addEditAddressStatus: 'failed'
    })
  ),

  on(
    ProfileActions.sendVerificationEmailSuccess,
    (state, action) => ({
      ...state,
      successMessage: action.message,
      message: null,
      verificationEmailSent: true,
      loading: false,
      verificationTransactionId: action.verificationTransactionId
    })
  ),

  on(
    ProfileActions.profileDataFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      message: action.error,
      verificationEmailSent: false,
      isImgLoading: false,
      loading: false,
      profileLoader: false,
    })
  ),
  on(
    ProfileActions.profileDataSaveFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      profileUpdated: 'failed',
      message: action.error,
      payloadValidation: action.payload,
      loading: false,
    })
  ),
  on(
    ProfileActions.verifyOtpFromEmailSuccess,
    (state) => ({
      ...state,
      successMessage: localization.user.USER_EMAIL_VERIFIED_SUCCESS,
      message: null,
      verificationEmailSent: false,
      emailVerificationFailed: false,
      loading: false,
      closeOpenedModel: true,
      userInfo: {
        ...state.userInfo,
        emailVerified: true
      }
    })
  ),

  on(
    ProfileActions.clearEmailVerificationInfo,
    (state) => ({
      ...state,
      successMessage: null,
      message: null,
      loading: false,
      verificationEmailSent: false,
      verificationTransactionId: null,
      closeOpenedModel: false,
      emailVerificationFailed: false,
    })
  ),

  on(
    ProfileActions.verifyOtpFromEmailFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      message: action.message,
      verificationEmailSent: true,
      loading: false,
      emailVerificationFailed: true,
    })
  ),

  // mobile verify
  on(
    ProfileActions.sendVerificationMobileSuccess,
    (state, action) => ({
      ...state,
      successMessage: action.message,
      message: null,
      verificationMobileSent: true,
      loading: false,
      verificationTransactionId: action.verificationTransactionId
    })
  ),

  on(
    ProfileActions.verifyOtpFromMobileSuccess,
    (state) => ({
      ...state,
      successMessage: localization.user.USER_MOBILE_VERIFIED_SUCCESS,
      message: null,
      verificationMobileSent: false,
      mobileVerificationFailed: false,
      loading: false,
      closeOpenedModel: true,
      userInfo: {
        ...state.userInfo,
        mobileVerified: true
      }
    })
  ),

  on(
    ProfileActions.verifyOtpFromMobileFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      message: action.message,
      verificationMobileSent: true,
      loading: false,
      mobileVerificationFailed: true,
    })
  ),

  // general profile loader helper

  on(
    ProfileActions.profileLoading,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(
    ProfileActions.profileLoaded,
    (state) => ({
      ...state,
      loading: false,
    })
  ),
  on(
    ProfileActions.fetchUserOfferSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      userAllOffers: action.responseData
    })
  ),
  on(
    ProfileActions.fetchUserFeedBack,
    (state, action) => ({
      ...state,
      feedbackLoading: true,
      userAllFeedback: null
    })
  ),
  on(
    ProfileActions.fetchUserFeedBackSuccess,
    (state, action) => ({
      ...state,
      feedbackLoading: false,
      userAllFeedback: action.responseData
    })
  ),
  on(
    ProfileActions.fetchUserFeedBackFailure,
    (state, action) => ({
      ...state,
      feedbackLoading: false,
      userAllFeedback: null
    })
  ),

  on(
    ProfileActions.deleteUserAddressFailure,
    (state, action) => ({
      ...state,
      //addressLoading: false,
      profileLoader: false,
      errorMessage: action.error?.error?.message ? action.error.error.message : localization.user.DEFAULT_ADDRESS_FAILED,
    })
  ),

);

export function profileReducer(state: UserProfileState, action: Action) {
  return _profileReducer(state, action);
}
