export enum CURRENT_SETTINGS_MODAL {
    // SIGN_IN_WITH_MOBILE = 'sign-in-with-mobile',
    // VERIFY_OTP_WITH_MOBILE = 'verify-otp-with-mobile',
    // VERIFY_PASSWORD_WITH_MOBILE = 'verify-password-with-mobile',
    // UPDATE_PROFILE_NAME = 'update-profile-name',
    // UPDATE_PROFILE_EMAIL_OR_PHONE = 'update-profile-email-or-phone',
    // UPDATE_PROFILE_DOB_GENDER = 'update-profile-dob-gender',
    // UPDATE_PROFILE_ADDRESS = 'update-profile-address',
    // UPDATE_PROFILE_PASSWORD = 'update-profile-password',
    // UPDATE_PROFILE_LOCATION = 'update-profile-location',
    // SOCIAL_LOGIN_HEADS_UP_START = 'social-login-headsup',

     
    CHANGE_PASSWORD             = 'change-password',
    RESET_PASSWORD              = 'reset-password',
    RESET_PASSWORD_MAIL_SEND    = 'reset-password-mail-send',
    RESET_PASSWORD_CONFIRM      = 'reset-password-confirm',
    RESET_PASSWORD_SUCCESS      = 'reset-password-success',

    CHANGE_EMAIL                        = 'change-email',
    CHANGE_EMAIL_ENTER_NEW_EMAIL        = 'change-email-enter-new-mail',
    CHANGE_EMAIL_OTP_VERIFICATION       = 'change-email-otp-verify',
    CHANGE_EMAIL_VERIFY_SUCCESS         = 'email-verify-success',

    CHANGE_PHONE_NUMBER                     = 'change-phone-number',
    CHANGE_PHONE_NUMBER_OTP_VERIFICATION    = 'change-phone-number-otp-verification',
    CHANGE_PHONE_NUMBER_SUCCESS             = 'change-phone-number-success'
}

// export enum AUTH_STATUS {
//     ANONYMOUS = 'anonymous',
//     SOFT_LOGGED_IN = 'soft-logged-in',
//     LOGGED_IN = 'logged-in'
// }

// export enum USER_TYPES {
//     EXISTING = 'existing',
//     NEW = 'new',
//     GUEST = 'guest'
// }

export enum SETTINGS_ACTION_TYPE {
//    AUTH_PHONE_LOGIN_START  = '[Auth] Phone Login Start',
//    AUTH_EMAIL_LOGIN_START = '[Auth] Email Login Start',
//    AUTH_PHONE_SIGNUP_START = '[Auth] Phone SignUp Start',
//    AUTH_EMAIL_SIGNUP_START = '[Auth] Email SignUp Start',
   AUTH_CURRENT_AUTH_MODEL = '[Auth] Change Current Auth Modal',
   AUTH_FIREBASE_CALL_SUCCESS = '[Auth] Firebase call Success',
//    AUTH_EMAIL_PASSWORD_LOGIN_START = '[Auth] Firebase call Success with Email and Password',
   AUTH_FIREBASE_CALL_FAILURE = '[Auth] Firebase call Failure',
//    AUTH_VERIFY_OTP_START = '[Auth] Verify OTP start',
//    AUTH_SAVE_FIREBASE_USER = '[Auth] Set firebase user',
//    AUTH_USER_LOGGED_IN_SUCCESS = '[Auth] User Logged in Success',
//    AUTH_SAVE_USER_NAME = '[Auth] Save Full Name',
//    AUTH_SAVE_USER_CONTACT_INFO = '[Auth] Save Email and Phone',
//    AUTH_SAVE_USER_PERSONAL_INFO = '[Auth] Save DOB and Gender',
   AUTH_UPDATE_USER_INFO = '[Auth] Update user profile',
//    AUTH_UPDATE_USER_INFO_SUCCESS = '[Auth] Update User Profile Success',
   AUTH_UPDATE_USER_INFO_FAILURE = '[Auth] Update User Profile Failure',
//    AUTH_LOGIN_EMAIL_USER_INFO = '[Auth] Verify Email And Password',
   AUTH_VERIFY_EMAIL_LOGIN_INFO = '[Auth] Verify Login Email And Password',
//    AUTH_REDIRECT_TO_SAVE_ADDRESS = '[Auth] Redirect To Save Address',
//    AUTH_UPDATE_USER_LOCATION = '[Auth] Update User Current Location',
//    AUTH_UPDATE_USER_ADDRESS = '[Auth] Update User Current Address',
//    AUTH_REDIRECT_TO_SIGN_IN = '[Auth] Redirect To SignIn',
   AUTH_UPDATE_ERROR_MESSAGE = '[Auth] Update Error Message',
//    AUTH_UPDATE_CONTACT_ERROR_MESSAGE = '[Auth] Update Contact Info Error Message',
//    AUTH_RESEND_OTP_START = '[Auth] Resend OTP Start',
//    AUTH_PROFILE_IMAGE_UPLOAD_START = '[Auth] Profile Image Upload Start',
//    AUTH_PROFILE_IMAGE_UPLOAD_COMPLETE = '[Auth] Profile Image Upload Complete',
//    SOCIAL_LOGIN_HEADS_UP_START = '[Auth] Social Login Heads Up Start',
//    AUTH_GMAIL_SIGNUP_START = '[Auth] Gmail SignUp Start',
//    AUTH_GMAIL_LOGIN_SUCCESS = '[Auth] Gmail Login Success',
//    AUTH_FACEBOOK_SIGNUP_START = '[Auth] Facebook Login Start',
//    AUTH_FACEBOOK_LOGIN_SUCCESS = '[Auth] Facebook Login Success',
//    AUTH_REDIRECT_TO_PROFILE_NAME = '[Auth] Redirect to Profile Name Screen',
//    AUTH_REDIRECT_TO_PROFILE_EMAIL_OR_PHONE = '[Auth] Redirect to Profile Email Or Phone Screen',
//    AUTH_REDIRECT_TO_UPDATE_PROFILE_LOCATION = '[Auth] Redirect to Update Profile Location',
//    AUTH_REDIRECT_TO_UPDATE_PROFILE_ADDRESS = '[Auth] Redirect to Update Profile Address',
//    AUTH_REDIRECT_TO_UPDATE_PROFILE_DOB_GENDER = '[Auth] Redirect to Update Profile DOB Gender',
//    AUTH_CHECK_USER_START = '[Auth] Check user start',
//    AUTH_LOGOUT = '[Auth] Logout',
   FETCH_PROFILE_DATA = '[Auth] Fetch profile',
   FETCH_PROFILE_DATA_SUCCESS = '[Auth] Fetch Profile Success',

   SETTINGS_REDIRECT_TO_CHANGE_PASSWORD             = '[Settings] Redirect to change password',
   SETTINGS_REDIRECT_TO_RESET_PASSWORD              = '[Settings] Redirect to reset password',
   SETTINGS_REDIRECT_TO_RESET_PASSWORD_MAIL_SEND    = '[Settings] Redirect to reset password mail send',
   SETTINGS_REDIRECT_TO_RESET_PASSWORD_CONFIRM      = '[Settings] Redirect to reset password confirm',
   SETTINGS_PASSWORD_MAIL_SEND                      = '[Settings] Reset password mail send',
   SETTINGS_CONFIRM_RESET_PASSWORD                  = '[Settings] Confirm reset password',
   SETTINGS_RESET_PASSWORD_RESPONSE_MESSAGE         = '[Settings] Reset password response message',

   SETTINGS_REDIRECT_TO_CHANGE_EMAIL                    = '[Settings] Redirect to change email',
   SETTINGS_CHECK_EMAIL_INITIATE                        = '[Settings] Check email initiate',
   SETTINGS_VERIFY_OTP_FOR_EMAIL                        = '[Settings] Verify OTP for email',
   SETTINGS_REDIRECT_TO_CHANGE_EMAIL_NEW_Email          = '[Settings] Redirect to change email new email',
   SETTINGS_REDIRECT_TO_CHANGE_EMAIL_OTP_VERIFICATION   = '[Settings] Redirect to change email OTP verification',
   SETTINGS_CONFIRM_UPDATE_EMAIL                        = '[Settings] Confirm update email',
   SETTINGS_REDIRECT_TO_CHANGE_EMAIL_VERIFY_SUCCESS     = '[Settings] Redirect to Change email verify success',
   SETTINGS_CHANGE_EMAIL_ERROR                          = '[Settings] Change email error',

   SETTINGS_REDIRECT_TO_CHANGE_PHONE_NUMBER                             = '[Settings] Redirect to change phone number',
   SETTINGS_CHECK_MOBILE_INITIATE                                       = '[Settings] Check mobile initiative',
   SETTINGS_REDIRECT_TO_CHANGE_MOBILE_OTP_VERIFICATION_SCREEN           = '[Settings] Redirect to change mobile OTP verification screen',
   SETTINGS_VERIFY_OTP_FOR_MOBILE                                       = '[Settings] Verify OTP for mobile',
   SETTINGS_REDIRECT_TO_CHANGE_MOBILE_OTP_VERIFICATION_SUCCESS_SCREEN   = '[Settings] Chang Mobile OTP verification success screen',
   
   SETTINGS_GET_PROFILE_DATA                = '[Settings] Get Profile Data',
   SETTINGS_GET_PROFILE_DATA_SUCCESS        = '[Settings] Get Profile Data Success',

   SETTINGS_FETCH_NOTIFICATION_SETTINGS_LIST            = '[Settings] Fetch notification settings list',
   SETTINGS_FETCH_NOTIFICATION_SETTINGS_LIST_SUCCESS    = '[Settings] Fetch notification settings list success',

   SETTINGS_FETCH_BLOCK_LIST_COUNT          = "[Settings] fetch block list count",
   SETTINGS_FETCH_BLOCK_LIST_COUNT_SUCCESS  = "[Settings] fetch block list count success",
   SETTINGS_FETCH_BLOCK_LIST                = "[Settings] fetch block list",
   SETTINGS_FETCH_BLOCK_LIST_SUCCESS        = "[Settings] fetch block list success",   
   SETTINGS_UNBLOCK_USER                    = "[Settings] unblock user",
   SETTINGS_UNBLOCK_USER_SUCCESS            = "[Settings] unblock user success",

   SETTINGS_CALL_FAILURE       = "[Settings] call failure"
}