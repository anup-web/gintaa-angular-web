export enum PROFILE_ACTION_TYPE {
    PROFILE_SHOW_LOADER = '[Profile] Profile Show Loader',
    PROFILE_HIDE_LOADER = '[Profile] Profile Hide Loader',
    PROFILE_FETCH = '[Profile] Profile Fetch',
    PROFILE_CLEAR = '[Profile] Profile Clear data',
    PROFILE_DATA_SUCCESS = '[Profile] Profile Data Success',
    PROFILE_DATA_FAILURE = '[Profile] Profile Data Failure',
    PROFILE_DATA_SAVE_FAILURE = '[Profile] Profile Data Save Failure',
    PROFILE_NAVIGATE_SCREEN = '[Profile] Profile Navigate Screen',
    ADDRESS_FETCH = '[Profile] Address Fetch',
    ADDRESS_DATA_SUCCESS = '[Profile] Address Data Success',
    ADDRESS_DATA_FAILURE = '[Profile] Address Data Failure',
    ADDRESS_FETCH_OTHER = '[Profile] Other Address Fetch',
    ADDRESS_DATA_OTHER_SUCCESS = '[Profile] Address Other Data Success',
    ADDRESS_DATA_OTHER_FAILURE = '[Profile] Address Other Data Failure',
    PROFILE_IMAGE_UPLOAD = '[Profile] Profile Image Upload',
    PROFILE_IMAGE_UPLOAD_COMPLETE = '[Profile] Profile Image Upload Complete',
    REMOVE_PHOTO_URL = '[Profile] Profile Remove Photo Url',
    PROFILE_UPDATE_USER_INFO = '[Profile] Profile Update user profile',
    PROFILE_UPDATE_USER_INFO_SUCCESS = '[Profile] Profile Update User Profile Success',
    PROFILE_UPDATE_USER_LOCATION = '[Profile] Profile Update User Current Location',
    PROFILE_UPDATE_USER_ADDRESS = '[Profile] Profile Update User Current Address',
    PROFILE_ADD_USER_ADDRESS = '[Profile] Profile Add User Address',
    PROFILE_ADD_USER_ADDRESS_SUCCESS = '[Profile] Profile Add User Address Success',
    PROFILE_ADD_USER_ADDRESS_FAILURE = '[Profile] Profile Add User Address Failure',
    PROFILE_DELETE_USER_ADDRESS = '[Profile] Profile Delete User Address',
    PROFILE_DELETE_USER_ADDRESS_SUCCESS = '[Profile] Profile Delete User Address Success',
    PROFILE_DELETE_USER_ADDRESS_FAILURE = '[Profile] Profile Delete User Address Failure',
    PROFILE_EDIT_USER_ADDRESS = '[Profile] Profile Edit User Address',
    PROFILE_EDIT_USER_ADDRESS_SUCCESS = '[Profile] Profile Edit User Address Success',
    PROFILE_EDIT_USER_ADDRESS_FAILURE = '[Profile] Profile Edit User Address Failure',
    PROFILE_DEFAULT_USER_ADDRESS = '[Profile] Profile Default User Address',
    PROFILE_DEFAULT_USER_ADDRESS_SUCCESS = '[Profile] Profile Default User Address Success',
    PROFILE_DEFAULT_USER_ADDRESS_FAILURE = '[Profile] Profile Default User Address Failure',
    PROFILE_SEND_VERIFICATION_EMAIL = '[Profile] Profile Send Verification Email',
    PROFILE_SEND_VERIFICATION_EMAIL_SUCCESS = '[Profile] Profile Send Verification Email Success',
    PROFILE_VERIFY_OTP_EMAIL = '[Profile] Profile Verify OTP Email',
    PROFILE_VERIFY_OTP_EMAIL_SUCCESS = '[Profile] Profile Verify OTP Email Success',
    PROFILE_CLEAR_VERIFICATION_INFO = '[Profile] Profile Clear Verification Info',
    PROFILE_VERIFY_OTP_EMAIL_FAILURE = '[Profile] Profile Verify OTP Email Failure',
    PROFILE_SEND_VERIFICATION_MOBILE = '[Profile] Profile Send Verification Mobile',
    PROFILE_SEND_VERIFICATION_MOBILE_SUCCESS = '[Profile] Profile Send Verification Mobile Success',
    PROFILE_VERIFY_OTP_MOBILE = '[Profile] Profile Verify OTP Mobile',
    PROFILE_VERIFY_OTP_MOBILE_SUCCESS = '[Profile] Profile Verify OTP Mobile Success',
    PROFILE_VERIFY_OTP_MOBILE_FAILURE = '[Profile] Profile Verify OTP Mobile Failure',
    PROFILE_FETCH_OTHER = '[Profile] Other Profile Fetch',
    PROFILE_DATA_OTHER_SUCCESS = '[Profile] Other Profile Data Success',
    PROFILE_DATA_OTHER_FAILURE = '[Profile] Other Profile Data Failure',

    PROFILE_LOADING = '[Profile] Profile Loading',
    PROFILE_LOADED = '[Profile] Profile Loaded',

    FETCH_USER_OFFER = '[Profile] Get User offers ',
    FETCH_USER_OFFER_SUCCESS = '[Profile] Get User offers Success',
    FETCH_USER_OFFER_FAILURE = '[Profile] Get User offers Failure',

    FETCH_USER_FEEDBACK = '[Profile] Get User Feedback ',
    FETCH_USER_FEEDBACK_SUCCESS = '[Profile] Get User Feedback Success',
    FETCH_USER_FEEDBACK_FAILURE = '[Profile] Get User Feedback Failure',

    PROFILE_ADDRESS_MODAL_OPEN = '[Profile] Profile Address modal open',
    PROFILE_ADDRESS_MODAL_CLOSE = '[Profile] Profile Address modal close',

    UPDATE_FIREBASE_TOKEN = 'Update firebase token'

}

export enum CURRENT_PROFILE_SCREEN {
    VIEW_PROFILE = 'view-profile',
    EDIT_PROFILE = 'edit-profile',
}

export const profileError =  {
    displayName: {
      required  : 'Name is required',
      minLength : 'Name must be minimum 2 character long',
      maxLength : 'Name should not be more than 30 characters long',
      pattern   : 'Name should not content spacial charector'
    }
  }
