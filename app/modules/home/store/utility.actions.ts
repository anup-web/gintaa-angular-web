import { createAction, props } from '@ngrx/store';
import { UTILITY_ACTION_TYPE } from './utility.action-types';
import { CreateBusinessProfileRequest } from '@gintaa/shared/models';

// general page loader helper
export const pageLoading = createAction(
    UTILITY_ACTION_TYPE.PAGE_LOADING
);

export const pageLoaded = createAction(
    UTILITY_ACTION_TYPE.PAGE_LOADED
);

export const setErrorMessage = createAction(
    UTILITY_ACTION_TYPE.SET_ERROR_MESSAGE,
    props<{ message: string; }>()
);

export const unsetErrorMessage = createAction(
    UTILITY_ACTION_TYPE.UNSET_ERROR_MESSAGE
);

export const setBusinessErrorMessage = createAction(
    UTILITY_ACTION_TYPE.SET_BUSINESS_ERROR_MESSAGE,
    props<{ message: string; }>()
);

export const unsetBusinessErrorMessage = createAction(
    UTILITY_ACTION_TYPE.UNSET_BUSINESS_ERROR_MESSAGE
);

export const setSuccessMessage = createAction(
    UTILITY_ACTION_TYPE.SET_SUCCESS_MESSAGE,
    props<{ message: string; }>()
);

export const unsetSuccessMessage = createAction(
    UTILITY_ACTION_TYPE.UNSET_SUCCESS_MESSAGE
);

export const clearMessages = createAction(
    UTILITY_ACTION_TYPE.CLEAR_MESSAGES
);

export const clearLastSavedFavoriteOfferId = createAction(
    UTILITY_ACTION_TYPE.CLEAR_LAST_SAVED_FAV_OFFER_ID
);

export const clearLastRemovedFavoriteOfferId = createAction(
    UTILITY_ACTION_TYPE.CLEAR_LAST_REMOVED_FAV_OFFER_ID
);

// BUSINESS RELATED ACTIONS
export const createBusinessProfile = createAction(
    UTILITY_ACTION_TYPE.CREATE_BUSINESS_PROFILE,
    props<{
        requestBody: CreateBusinessProfileRequest;
    }>()
);

export const createBusinessProfileSuccess = createAction(
    UTILITY_ACTION_TYPE.CREATE_BUSINESS_PROFILE_SUCCESS,
    props<{
        businessFormData: any;
        message: string;
        redirect: boolean;
    }>()
);

export const createBusinessProfileFailure = createAction(
    UTILITY_ACTION_TYPE.CREATE_BUSINESS_PROFILE_FAILURE,
    props<{ error: any; }>()
);

export const creatBusinessProfileReset = createAction(
    UTILITY_ACTION_TYPE.CREATE_BUSINESS_PROFILE_RESET
);


export const clearBusinessProfile = createAction(
    UTILITY_ACTION_TYPE.CLEAR_BUSINESS_PROFILE
);

export const fetchBusinessProfile = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_PROFILE,
    props<{ status: string; }>()
);

export const fetchBusinessProfileSuccess = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_PROFILE_SUCCESS,
    props<{
        businessFormData: any;
        message: string;
        redirect: boolean;
    }>()
);

export const fetchBusinessProfileEmpty = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_PROFILE_EMPTY,
    props<{
        message: string;
    }>()
);

export const fetchBusinessProfileFailure = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_PROFILE_FAILURE,
    props<{
        error: any;
    }>()
);

export const reFetchBusinessProfile = createAction(
    UTILITY_ACTION_TYPE.RE_FETCH_BUSINESS_PROFILE
);

// FETCH ALL BUSINESS PROFILES FOR A USER WITH THE ROLE
export const fetchMemberBusinessProfiles = createAction(
    UTILITY_ACTION_TYPE.FETCH_MEMBER_BUSINESS_PROFILES
);

export const fetchMemberBusinessProfilesSuccess = createAction(
    UTILITY_ACTION_TYPE.FETCH_MEMBER_BUSINESS_PROFILES_SUCCESS,
    props<{
        businessData: any;
        message: string;
        redirect: boolean;
    }>()
);

export const fetchMemberBusinessProfilesEmpty = createAction(
    UTILITY_ACTION_TYPE.FETCH_MEMBER_BUSINESS_PROFILES_EMPTY,
    props<{
        message: string;
    }>()
);

export const fetchMemberBusinessProfilesFailure = createAction(
    UTILITY_ACTION_TYPE.FETCH_MEMBER_BUSINESS_PROFILES_FAILURE,
    props<{
        error: any;
    }>()
);

export const addOfferToFavourite = createAction(
    UTILITY_ACTION_TYPE.ADD_OFFER_TO_FAVOURITE,
    props<{ offerId: string}>()
)

export const addRemoveOfferToFavouriteSuccess = createAction(
    UTILITY_ACTION_TYPE.ADD_REMOVE_OFFER_TO_FAVOURITE_SUCCESS,
    props<{ offerId: string }>()
)

export const addRemoveOfferToFavouriteFailure = createAction(
    UTILITY_ACTION_TYPE.ADD_REMOVE_OFFER_TO_FAVOURITE_FAILURE,
    props<{ message: string }>()
)

/*****
 * BREAKING ADD-TO-FAV AND REMOVE-FROM-FAV TO CLEAR OUT CONFUSIONS
 * SUBSCRIBER IS GOING TO INFINITE LOOP
 */
 export const removeOfferFromFavourite = createAction(
    UTILITY_ACTION_TYPE.REMOVE_OFFER_FROM_FAVOURITE,
    props<{ offerId: string}>()
)

export const removeOfferFromFavouriteSuccess = createAction(
    UTILITY_ACTION_TYPE.REMOVE_OFFER_TO_FAVOURITE_SUCCESS,
    props<{ offerId: string }>()
)

export const removeOfferFromFavouriteFailure = createAction(
    UTILITY_ACTION_TYPE.REMOVE_OFFER_TO_FAVOURITE_FAILURE,
    props<{ message: string }>()
)

export const getFavouriteOfferCount = createAction(
    UTILITY_ACTION_TYPE.GET_FAVOURITE_OFFER_COUNT,
    props<{ offerId: string}>()
)

export const getFavouriteOfferCountSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_FAVOURITE_OFFER_COUNT_SUCCESS,
    props<{ response: any }>()
)

export const getFavouriteOfferCountFailure = createAction(
    UTILITY_ACTION_TYPE.GET_FAVOURITE_OFFER_COUNT_FAILURE,
    props<{ message: string }>()
)

export const getOfferStatistics = createAction(
    UTILITY_ACTION_TYPE.GET_OFFER_STATS,
    props<{ offerId: string}>()
)

export const getOfferStatisticsSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_OFFER_STATS_SUCCESS,
    props<{ response: any }>()
)

export const getOfferStatisticsFailure = createAction(
    UTILITY_ACTION_TYPE.GET_OFFER_STATS_FAILURE,
    props<{ message: string }>()
)

export const getOffersMatchBox = createAction(
    UTILITY_ACTION_TYPE.GET_OFFERS_MATCHBOX,
)

export const clearOffersMatchBox = createAction(
    UTILITY_ACTION_TYPE.CLEAR_OFFERS_MATCHBOX,
)

export const getOffersMatchBoxSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_OFFERS_MATCHBOX_SUCCESS,
    props<{ response: any }>()
)

export const getOffersMatchBoxFailure = createAction(
    UTILITY_ACTION_TYPE.GET_OFFERS_MATCHBOX_FAILURE,
    props<{ message: string }>()
)




export const getCurrentBusinessActiveMembers = createAction(
    UTILITY_ACTION_TYPE.GET_CURRENT_BUSINESS_ACTIVE_MEMBERS,
    props<{ businessId: string }>()
)
export const getCurrentBusinessActiveMembersSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_CURRENT_BUSINESS_ACTIVE_MEMBERS_SUCCESS,
    props<{ response: any }>()
)
export const getCurrentBusinessActiveMembersFailure = createAction(
    UTILITY_ACTION_TYPE.GET_CURRENT_BUSINESS_ACTIVE_MEMBERS_FAILURE,
    props<{ message: string }>()
)


export const delegateBusinessOffer = createAction(
    UTILITY_ACTION_TYPE.DELEGATE_BUSINESS_OFFER,
    props<{ offerId: string, memberIdentityId: string }>()
)
export const delegateBusinessOfferSuccess = createAction(
    UTILITY_ACTION_TYPE.DELEGATE_BUSINESS_OFFER_SUCCESS,
    props<{ payload: any, message: string }>()
)
export const delegateBusinessOfferFailure = createAction(
    UTILITY_ACTION_TYPE.DELEGATE_BUSINESS_OFFER_FAILURE,
    props<{ message: string }>()
)

export const changeOfferDelegationStatusFalse = createAction(
    UTILITY_ACTION_TYPE.CHANGE_DELEGATION_STATUS,
    props<{ status: boolean }>()
)

export const fetchLatestDraftOffer = createAction(
    UTILITY_ACTION_TYPE.GET_LATEST_DRAFT_OFFER,
)

export const clearLatestDraftOffer = createAction(
    UTILITY_ACTION_TYPE.CLEAR_LATEST_DRAFT_OFFER,
)

export const fetchLatestDraftOfferSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_LATEST_DRAFT_OFFER_SUCCESS,
    props<{ response: any }>()
)

export const fetchLatestDraftOfferFailure = createAction(
    UTILITY_ACTION_TYPE.GET_LATEST_DRAFT_OFFER_FAILURE,
    props<{ message: string }>()
)



export const fetchBusinessInvitations = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_INVITATIONS
);

export const fetchBusinessInvitationsSuccess = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_INVITATIONS_SUCCESS,
    props<{
        businessInvitations: any;
        message: string;
    }>()
);

export const fetchBusinessInvitationsFailure = createAction(
    UTILITY_ACTION_TYPE.FETCH_BUSINESS_INVITATIONS_FAILURE,
    props<{
        error: any;
    }>()
);

export const acceptInvitation = createAction(
    UTILITY_ACTION_TYPE.ACCEPT_INVITATION,
    props<{
        businessId: string;
    }>()
);

export const acceptInvitationSuccess = createAction(
    UTILITY_ACTION_TYPE.ACCEPT_INVITATION_SUCCESS
);

export const acceptInvitationFailure = createAction(
    UTILITY_ACTION_TYPE.ACCEPT_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const rejectInvitationSuccess = createAction(
    UTILITY_ACTION_TYPE.REJECT_INVITATION_SUCCESS
);

export const rejectInvitationFailure = createAction(
    UTILITY_ACTION_TYPE.REJECT_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const rejectInvitation = createAction(
    UTILITY_ACTION_TYPE.REJECT_INVITATION,
    props<{
        businessId: string;
        reason: string;
    }>()
);


////////////// Receive account credential ///////////////////////
export const addReceivePaymentDetails = createAction(
    UTILITY_ACTION_TYPE.ADD_RECEIVE_PAYMENT_DETAILS,
    props<{
        paymentPostObject: any;
    }>()
);
export const addReceivePaymentDetailsSuccess = createAction(
    UTILITY_ACTION_TYPE.ADD_RECEIVE_PAYMENT_DETAILS_SUCCESS,
    props<{
        message: string;
    }>()
);
export const addReceivePaymentDetailsFailure = createAction(
    UTILITY_ACTION_TYPE.ADD_RECEIVE_PAYMENT_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);


export const updateReceivePaymentDetails = createAction(
    UTILITY_ACTION_TYPE.UPDATE_RECEIVE_PAYMENT_DETAILS,
    props<{
        paymentPostObject: any;
    }>()
);
export const updateReceivePaymentDetailsSuccess = createAction(
    UTILITY_ACTION_TYPE.UPDATE_RECEIVE_PAYMENT_DETAILS_SUCCESS,
    props<{
        message: string;
    }>()
);
export const updateReceivePaymentDetailsFailure = createAction(
    UTILITY_ACTION_TYPE.UPDATE_RECEIVE_PAYMENT_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);


export const closeOpenedPopupReset = createAction(
    UTILITY_ACTION_TYPE.CLOSE_OPENED_POPUP_RESET,
);


export const getAllReceivePaymentList = createAction(
    UTILITY_ACTION_TYPE.GET_ALL_RECEIVE_PAYMENT_LIST
);
export const getAllReceivePaymentListSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_ALL_RECEIVE_PAYMENT_LIST_SUCCESS,
    props<{
        message: string;
        accountList: any[];
    }>()
);
export const getAllReceivePaymentListFailure = createAction(
    UTILITY_ACTION_TYPE.GET_ALL_RECEIVE_PAYMENT_LIST_FAILURE,
    props<{
        error: any;
    }>()
);


export const getAllReceivePaymentListForBusiness = createAction(
    UTILITY_ACTION_TYPE.GET_ALL_RECEIVE_PAYMENT_LIST_FOR_BUSINESS,
    props<{
        businessId: string;
    }>()
);
export const getAllReceivePaymentListForBusinessSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_ALL_RECEIVE_PAYMENT_LIST_FOR_BUSINESS_SUCCESS,
    props<{
        message: string;
        accountList: any[];
    }>()
);
export const getAllReceivePaymentListForBusinessFailure = createAction(
    UTILITY_ACTION_TYPE.GET_ALL_RECEIVE_PAYMENT_LIST_FOR_BUSINESS_FAILURE,
    props<{
        error: any;
    }>()
);



export const deleteReceivePaymentAccount = createAction(
    UTILITY_ACTION_TYPE.DELETE_RECEIVE_PAYMENT_ACCOUNT,
    props<{
        paymentDetailId: string;
    }>()
);
export const deleteReceivePaymentAccountSuccess = createAction(
    UTILITY_ACTION_TYPE.DELETE_RECEIVE_PAYMENT_ACCOUNT_SUCCESS,
    props<{
        message: string;
    }>()
);
export const deleteReceivePaymentAccountFailure = createAction(
    UTILITY_ACTION_TYPE.DELETE_RECEIVE_PAYMENT_ACCOUNT_FAILURE,
    props<{
        error: any;
    }>()
);


export const deleteReceivePaymentAccountForBusiness = createAction(
    UTILITY_ACTION_TYPE.DELETE_RECEIVE_PAYMENT_ACCOUNT_FOR_BUSINESS,
    props<{
        paymentDetailId: string;
        businessId: string
    }>()
);
// export const deleteReceivePaymentAccountForBusinessSuccess = createAction(
//     UTILITY_ACTION_TYPE.DELETE_RECEIVE_PAYMENT_ACCOUNT_SUCCESS,
//     props<{
//         message: string;
//     }>()
// );
// export const deleteReceivePaymentAccountForBusinessFailure = createAction(
//     UTILITY_ACTION_TYPE.DELETE_RECEIVE_PAYMENT_ACCOUNT_FAILURE,
//     props<{
//         error: any;
//     }>()
// );



export const getMigrationDataForBusiness = createAction(
    UTILITY_ACTION_TYPE.GET_MIGRATION_DATA_FOR_BUSINESS
);

export const getMigrationDataForBusinessSuccess = createAction(
    UTILITY_ACTION_TYPE.GET_MIGRATION_DATA_FOR_BUSINESS_SUCCESS,
    props<{
        migrationData: any
    }>()
);

export const getMigrationDataForBusinessFailure = createAction(
    UTILITY_ACTION_TYPE.GET_MIGRATION_DATA_FOR_BUSINESS_FAILURE,
    props<{
        error: any;
    }>()
);

export const resetMigreatDataFromStore = createAction(
    UTILITY_ACTION_TYPE.RESET_MIGRATE_DATA_FOR_BUSINESS
);