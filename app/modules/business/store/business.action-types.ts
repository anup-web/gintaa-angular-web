export enum BUSINESS_ACTION_TYPE {
    PAGE_LOADING = '[Business] Page Loading',
    PAGE_LOADED = '[Business] Page Loaded',
    CLEAR_SUCCESS_MSG = '[Business] Clear Success Message',

    // BUSINESS
    FETCH_BUSINESS_PROFILE = '[Business] Fetch Business Profile',
    FETCH_BUSINESS_PROFILE_SUCCESS = '[Business] Fetch Business Profile Success',
    FETCH_BUSINESS_PROFILE_FAILURE = '[Business] Fetch Business Profile Failure',

    FETCH_BUSINESS_INVITATIONS = '[Business] Fetch Business Invitations',
    FETCH_BUSINESS_INVITATIONS_SUCCESS = '[Business] Fetch Business Invitations Success',
    FETCH_BUSINESS_INVITATIONS_FAILURE = '[Business] Fetch Business Invitations Failure',

    ACTIVATE_BUSINESS_PROFILE = '[Business] Activate Business Profile',
    DEACTIVATE_BUSINESS_PROFILE = '[Business] De-activate Business Profile',

    ACCEPT_INVITATION = '[Business] Accept Invitation',
    ACCEPT_INVITATION_SUCCESS = '[Business] Accept Invitation Success',
    ACCEPT_INVITATION_FAILURE = '[Business] Accept Invitation Failure',
    
    REJECT_INVITATION = '[Business] Reject Invitation',
    REJECT_INVITATION_SUCCESS = '[Business] Reject Invitation Success',
    REJECT_INVITATION_FAILURE = '[Business] Reject Invitation Failure',

    ACTIVATE_BUSINESS_PROFILE_SUCCESS = '[Business] Activate Business Profile Success',
    ACTIVATE_BUSINESS_PROFILE_FAILURE = '[Business] Activate Business Profile Failure',

    DEACTIVATE_BUSINESS_PROFILE_SUCCESS = '[Business] De-activate Business Profile Success',
    DEACTIVATE_BUSINESS_PROFILE_FAILURE = '[Business] De-activate Business Profile Failure',

    FETCH_BUSINESS_DETAILS          = '[Business] Fetch Business Details',
    FETCH_BUSINESS_DETAILS_BY_SLUG  = '[Business] Fetch Business Details By Slug',
    FETCH_BUSINESS_DETAILS_SUCCESS  = '[Business] Fetch Business Details Success',
    FETCH_BUSINESS_DETAILS_FAILURE  = '[Business] Fetch Business Details Failure',

    UPDATE_BUSINESS_DETAILS = '[Business] update Business Details',
    UPDATE_BUSINESS_DETAILS_SUCCESS = '[Business] update Business Details Success',
    UPDATE_BUSINESS_DETAILS_FAILURE = '[Business] update Business Details Failure',

    COVER_IMAGE_UPLOAD = '[Business] Cover Image Upload',
    LOGO_UPLOAD = '[Business] Logo Upload',
    LOGO_UPLOAD_COMPLETE = '[Business] Logo Upload Complete',
    COVER_IMAGE_UPLOAD_COMPLETE = '[Business] Cover Image Upload Complete',
    COVER_IMAGE_UPLOAD_FAILURE = '[Business] Cover Image Upload Failure',
    LOGO_DELETE = '[Business] Logo Delete',
    LOGO_DELETE_SUCCESS = '[Business] Logo Delete Success',
    LOGO_DELETE_FAILURE = '[Business] Logo Delete Failure',

    UPDATE_BRAND_COLOR = '[Business] Update Brand Color',
    UPDATE_BRAND_COLOR_SUCCESS = '[Business] Update Brand Color Success',
    UPDATE_BRAND_COLOR_FAILURE = '[Business] Update Brand Color Failure',

    ADD_ADDRESS = '[Business] Add Business Address',
    ADD_ADDRESS_SUCCESS = '[Business] Add Business Address Success',
    ADD_ADDRESS_FAILURE = '[Business] Add Business Address Failure',

    EDIT_ADDRESS = '[Business] Edit Business Address',
    EDIT_ADDRESS_SUCCESS = '[Business] Edit Business Address Success',
    EDIT_ADDRESS_FAILURE = '[Business] Edit Business Address Failure',

    UPDATE_LOCATION = '[Business] Udate Business Location',
    UPDATE_LOCATION_TITLE = '[Business] Udate Business Location Title',
    UPDATE_ADDRESS = '[Business] Udate Business Address',
    UPDATE_ADDRESS_LIST = '[Business] Udate Address List',
    RESET_MODAL_FLAG = '[Business] Reset Business Modal Flag',
    REMOVE_ADDRESS = '[Business] Remove Business Address',

    FETCH_BUSINESS_MEMBERS = '[Business] Fetch Business Members',
    FETCH_BUSINESS_MEMBERS_SUCCESS = '[Business] Fetch Business Members Success',
    FETCH_BUSINESS_MEMBERS_FAILURE = '[Business] Fetch Business Members Failure',

    GET_ALL_BUSINESS_ROLES          = '[Business] Fetch Business Roles',
    GET_ALL_BUSINESS_ROLES_SUCCESS  = '[Business] Fetch Business Roles Success',
    GET_ALL_BUSINESS_ROLES_FAILURE  = '[Business] Fetch Business Roles Failure',

    UPDATE_BUSINESS_MEMBER = '[Business] Update Business Member',
    UPDATE_BUSINESS_MEMBER_SUCCESS = '[Business] Update Business Member Success',
    UPDATE_BUSINESS_MEMBER_FAILURE = '[Business] Update Business Member Failure',

    REMOVE_BUSINESS_MEMBER = '[Business] Remove Business Member',
    REMOVE_BUSINESS_MEMBER_SUCCESS = '[Business] Remove Business Member Success',
    REMOVE_BUSINESS_MEMBER_FAILURE = '[Business] Remove Business Member Failure',

    RESEND_INVITATION = '[Business] Resend Invitation',
    RESEND_INVITATION_SUCCESS = '[Business] Resend Invitation Success',
    RESEND_INVITATION_FAILURE = '[Business] Resend Invitation Failure',

    REMOVE_INVITATION = '[Business] Remove Invitation',
    REMOVE_INVITATION_SUCCESS = '[Business] Remove Invitation Success',
    REMOVE_INVITATION_FAILURE = '[Business] Remove Invitation Failure',

    UPDATE_MEMBER_ACTIVATION_STATUS         = '[Business] Update Member Activation',
    UPDATE_MEMBER_ACTIVATION_STATUS_SUCCESS = '[Business] Update Member Activation Success',
    UPDATE_MEMBER_ACTIVATION_STATUS_FAILURE = '[Business] Update Member Activation Failure',

    ADD_BUSINESS_MEMBER = '[Business] Add Business Member',
    ADD_BUSINESS_MEMBER_SUCCESS = '[Business] Add Business Member Success',
    ADD_BUSINESS_MEMBER_FAILURE = '[Business] Add Business Member Failure',

    FETCH_BUSINESS_MEMBER_DETAILS = '[Business] Fetch Business Member Details',
    FETCH_BUSINESS_MEMBER_DETAILS_SUCCESS = '[Business] Fetch Business Member Details Success',
    FETCH_BUSINESS_MEMBER_DETAILS_FAILURE = '[Business] Fetch Business Member Details Failure',

    FETCH_BUSINESS_OFFERS = '[Business] Fetch Business Offers',
    FETCH_BUSINESS_OFFERS_SUCCESS = '[Business] Fetch Business Offers Success',
    FETCH_BUSINESS_OFFERS_FAILURE = '[Business] Fetch Business Offers Failure',

    FETCH_BUSINESS_ALL_PUBLISHED_OFFERS = '[Business] Fetch Business All Published Offers',
    FETCH_BUSINESS_ALL_PUBLISHED_OFFERS_SUCCESS = '[Business] Fetch Business Offers Success',
    FETCH_BUSINESS_ALL_PUBLISHED_OFFERS_FAILURE = '[Business] Fetch Business Offers Failure',

    FETCH_DEAL_COMMENTS = '[Business] Fetch Business Deal Comments',
    FETCH_DEAL_COMMENTS_SUCCESS = '[Business] Fetch Business Deal Comments Success',
    FETCH_DEAL_COMMENTS_FAILURE = '[Business] Fetch Business Deal Comments Failure',

    FETCH_BUSINESS_SUGGESTED_URL = '[Business] Fetch Business Suggested URL',
    FETCH_BUSINESS_SUGGESTED_URL_SUCCESS = '[Business] Fetch Business Suggested URL Success',
    FETCH_BUSINESS_SUGGESTED_URL_FAILURE = '[Business] Fetch Business Suggested URL Failure',

    FETCH_BUSINESS_OFFERS_BY_IDENTITY_ID = '[Business] Fetch Business Offers By Identity Id',
    FETCH_BUSINESS_OFFERS_BY_IDENTITY_ID_SUCCESS = '[Business] Fetch Business Offers By Identity Id Success',
    FETCH_BUSINESS_OFFERS_BY_IDENTITY_ID_FAILURE = '[Business] Fetch Business Offers By Identity Id Failure',

    REFETCH_BUSINESS_OFFER = '[Business] Re-Fetch Business Offer',

    RESET_CLOSE_OPENED_POPUP_STATUS = "[Business] Reset close opened popup status"
}
