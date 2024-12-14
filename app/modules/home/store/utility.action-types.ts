export enum UTILITY_ACTION_TYPE {
    PAGE_LOADING = '[Utility] Page Loading',
    PAGE_LOADED = '[Utility] Page Loaded',
    SET_ERROR_MESSAGE = '[Utility] Set Error Message',
    UNSET_ERROR_MESSAGE = '[Utility] Clear Error Message',
    SET_BUSINESS_ERROR_MESSAGE = '[Utility] Set Business Error Message',
    UNSET_BUSINESS_ERROR_MESSAGE = '[Utility] Clear Business Error Message',
    SET_SUCCESS_MESSAGE = '[Utility] Set Success Message',
    UNSET_SUCCESS_MESSAGE = '[Utility] Clear Success Message',
    CLEAR_MESSAGES = '[Utility] Clear Messages',
    CLEAR_LAST_SAVED_FAV_OFFER_ID = '[Utility] Clear Last Saved Favorite Offer Id',
    CLEAR_LAST_REMOVED_FAV_OFFER_ID = '[Utility] Clear Last Removed Favorite Offer Id',

    // BUSINESS
    CREATE_BUSINESS_PROFILE = '[Utility] Create Business Profile',
    CREATE_BUSINESS_PROFILE_SUCCESS = '[Utility] Create Business Profile Success',
    CREATE_BUSINESS_PROFILE_FAILURE = '[Utility] Create Business Profile Failure',
    CREATE_BUSINESS_PROFILE_RESET = '[Utility] Create Business Profile Reset',
    CLEAR_BUSINESS_PROFILE = '[Utility] Clear Business Profile',
    FETCH_BUSINESS_PROFILE = '[Utility] Fetch Business Profile',
    FETCH_BUSINESS_PROFILE_SUCCESS = '[Utility] Fetch Business Profile Success',
    FETCH_BUSINESS_PROFILE_EMPTY = '[Utility] Fetch Business Profile Empty',
    FETCH_BUSINESS_PROFILE_FAILURE = '[Utility] Fetch Business Profile Failure',
    RE_FETCH_BUSINESS_PROFILE = '[Utility] Re Fetch Business Profile',
    FETCH_MEMBER_BUSINESS_PROFILES = '[Utility] Fetch Member Business Profiles',
    FETCH_MEMBER_BUSINESS_PROFILES_SUCCESS = '[Utility] Fetch Member Business Profiles Success',
    FETCH_MEMBER_BUSINESS_PROFILES_EMPTY = '[Utility] Fetch Member Business Profiles Empty',
    FETCH_MEMBER_BUSINESS_PROFILES_FAILURE = '[Utility] Fetch Member Business Profiles Failure',

    // FAVOURITE
    ADD_OFFER_TO_FAVOURITE = '[Utility] Add offer to favourites',
    REMOVE_OFFER_FROM_FAVOURITE = '[Utility] Remove offer from favourite',
    ADD_REMOVE_OFFER_TO_FAVOURITE_SUCCESS = '[Utility] Add or remove favourite success',
    ADD_REMOVE_OFFER_TO_FAVOURITE_FAILURE = '[Utility] Add or remove favourite failure',
    REMOVE_OFFER_TO_FAVOURITE_SUCCESS = '[Utility] Remove favourite success',
    REMOVE_OFFER_TO_FAVOURITE_FAILURE = '[Utility] Remove favourite failure',

    GET_FAVOURITE_OFFER_COUNT = '[Utility] Get favourite offer count',
    GET_FAVOURITE_OFFER_COUNT_SUCCESS = '[Utility] Get favourite offer count success',
    GET_FAVOURITE_OFFER_COUNT_FAILURE = '[Utility] Get favourite offer count failure',

    // stats
    GET_OFFER_STATS = '[Utility] Get offer stat',
    GET_OFFER_STATS_SUCCESS = '[Utility] Get offer stat success',
    GET_OFFER_STATS_FAILURE = '[Utility] Get offer stat failure',

    // match box
    GET_OFFERS_MATCHBOX = '[Utility] Store get offers match box',
    CLEAR_OFFERS_MATCHBOX = '[Utility] Store Clear offers match box',
    GET_OFFERS_MATCHBOX_SUCCESS = '[Utility] Store offers match box success',
    GET_OFFERS_MATCHBOX_FAILURE = '[Utility] Store offers match box failure',

    // draft offer
    GET_LATEST_DRAFT_OFFER = '[Utility] Store get latest draft offers',
    CLEAR_LATEST_DRAFT_OFFER = '[Utility] Store Clear latest draft offer',
    GET_LATEST_DRAFT_OFFER_SUCCESS = '[Utility] Store latest draft offer success',
    GET_LATEST_DRAFT_OFFER_FAILURE = '[Utility] Store latest draft offer failure',

    // get current business active member
    GET_CURRENT_BUSINESS_ACTIVE_MEMBERS          = '[Utility] Store get current business active members',
    GET_CURRENT_BUSINESS_ACTIVE_MEMBERS_SUCCESS  = '[Utility] Store get current business active members success',
    GET_CURRENT_BUSINESS_ACTIVE_MEMBERS_FAILURE  = '[Utility] Store get current business active members failure',


    // delegate business offer to a member
    DELEGATE_BUSINESS_OFFER          = '[Utility] Store delegate business offer',
    DELEGATE_BUSINESS_OFFER_SUCCESS  = '[Utility] Store delegate business offer success',
    DELEGATE_BUSINESS_OFFER_FAILURE  = '[Utility] Store delegate business offer failure',

    // Change delegation status
    CHANGE_DELEGATION_STATUS = '[Utility] Store Change Delegation Status',


    // business
    FETCH_BUSINESS_INVITATIONS = '[Business] Fetch Business Invitations',
    FETCH_BUSINESS_INVITATIONS_SUCCESS = '[Business] Fetch Business Invitations Success',
    FETCH_BUSINESS_INVITATIONS_FAILURE = '[Business] Fetch Business Invitations Failure',

    ACCEPT_INVITATION = '[Business] Accept Invitation',
    ACCEPT_INVITATION_SUCCESS = '[Business] Accept Invitation Success',
    ACCEPT_INVITATION_FAILURE = '[Business] Accept Invitation Failure',
    
    REJECT_INVITATION = '[Business] Reject Invitation',
    REJECT_INVITATION_SUCCESS = '[Business] Reject Invitation Success',
    REJECT_INVITATION_FAILURE = '[Business] Reject Invitation Failure',


    // Payment receive account details
    // add details 
    ADD_RECEIVE_PAYMENT_DETAILS         = '[Payment] Add Receive Payment Details',
    ADD_RECEIVE_PAYMENT_DETAILS_SUCCESS = '[Payment] Add Receive Payment Details Success',
    ADD_RECEIVE_PAYMENT_DETAILS_FAILURE = '[Payment] Add Receive Payment Details Failure',

    // Update details 
    UPDATE_RECEIVE_PAYMENT_DETAILS         = '[Payment] Update Receive Payment Details',
    UPDATE_RECEIVE_PAYMENT_DETAILS_SUCCESS = '[Payment] Update Receive Payment Details Success',
    UPDATE_RECEIVE_PAYMENT_DETAILS_FAILURE = '[Payment] Update Receive Payment Details Failure',

    // Get All details 
    // personal
    GET_ALL_RECEIVE_PAYMENT_LIST                = '[Payment] Get Receive Payment List',
    GET_ALL_RECEIVE_PAYMENT_LIST_SUCCESS        = '[Payment] Get Receive Payment List Success',
    GET_ALL_RECEIVE_PAYMENT_LIST_FAILURE        = '[Payment] Get Receive Payment List Failure',
    // business
    GET_ALL_RECEIVE_PAYMENT_LIST_FOR_BUSINESS           = '[Payment] Get Receive Payment List For Business',
    GET_ALL_RECEIVE_PAYMENT_LIST_FOR_BUSINESS_SUCCESS   = '[Payment] Get Receive Payment List For Business Success',
    GET_ALL_RECEIVE_PAYMENT_LIST_FOR_BUSINESS_FAILURE   = '[Payment] Get Receive Payment List For Business Failure',


    // delete details 
    // personal
    DELETE_RECEIVE_PAYMENT_ACCOUNT         = '[Payment] Delete Receive Payment Account',
    DELETE_RECEIVE_PAYMENT_ACCOUNT_SUCCESS = '[Payment] Delete Receive Payment Account Success',
    DELETE_RECEIVE_PAYMENT_ACCOUNT_FAILURE = '[Payment] Delete Receive Payment Account Failure',
    // business
    DELETE_RECEIVE_PAYMENT_ACCOUNT_FOR_BUSINESS         = '[Payment] Delete Receive Payment Account For Business',
    DELETE_RECEIVE_PAYMENT_ACCOUNT_FOR_BUSINESS_SUCCESS = '[Payment] Delete Receive Payment Account For Business Success',
    DELETE_RECEIVE_PAYMENT_ACCOUNT_FOR_BUSINESS_FAILURE = '[Payment] Delete Receive Payment Account For Business Failure',


    CLOSE_OPENED_POPUP_RESET = '[Paymeny] Close Opened Popup Reset',

    GET_MIGRATION_DATA_FOR_BUSINESS         = '[Business] Get Migration Data For Business',
    GET_MIGRATION_DATA_FOR_BUSINESS_SUCCESS = '[Business] Get Migration Data For Business Success',
    GET_MIGRATION_DATA_FOR_BUSINESS_FAILURE = '[Business] Get Migration Data For Business Failure',

    RESET_MIGRATE_DATA_FOR_BUSINESS         = '[Business] Reset Migrate Data For Business'
}
