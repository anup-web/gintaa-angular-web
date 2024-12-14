import { createAction, props } from '@ngrx/store';
import {
    DealAvailableTabs,
    DealDetailsFormat,
    DealHistory,
    DealSnapshot,
    FetchDealRequestObject,
    InitiateDealRequestObject
} from '../models/deal.model';
import { DEAL_ACTION_TYPE } from '../configs/deal.config';

export const pageLoading = createAction(
    DEAL_ACTION_TYPE.PAGE_LOADING
);

export const emptyInitiateData = createAction(
    DEAL_ACTION_TYPE.EMPTY_INITIATE_DEAL
);

export const pageLoaded = createAction(
    DEAL_ACTION_TYPE.PAGE_LOADED
);

export const fetchAllDeal = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL,
    props<{
        input: FetchDealRequestObject;
        currentFetch: string;
        append: boolean
    }>()
);

export const updateCurrentFetch = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL,
    props<{
        dealType: any;
    }>()
);

export const fetchAllDealFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL_FAILURE,
    props<{
        error: any;
        currentFetch: string;
        append: boolean
    }>()
);

export const fetchAllDealSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL_SUCCESS,
    props<{
        responseData: any[];
        currentFetch: string;
        append: boolean;
    }>()
);

export const fetchUserOffer = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_OFFER,
    props<{ offerId: string }>()
);

export const fetchUserOfferFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_OFFER_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchUserOfferSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_OFFER_SUCCESS,
    props<{
        responseData: any[];
        selectedOffers: any[]
    }>()
);

export const fetchUserAddress = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_ADDRESS,
);

export const fetchUserAddressFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_ADDRESS_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchUserAddressSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_ADDRESS_SUCCESS,
    props<{
        responseData: any[];
    }>()
);

export const fetchUserAllOffer = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_ALL_OFFER,
    props<{ userId: string, offerId: string, isBusiness:boolean }>()
);

export const fetchUserAllOfferFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_ALL_OFFER_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchUserAllOfferSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_ALL_OFFER_SUCCESS,
    props<{
        responseData: any[];
        selectedOffers: any[];
    }>()
);


export const fetchMyOffer = createAction(
    DEAL_ACTION_TYPE.FETCH_MY_OFFER,
    props<{ userId:string, isBusiness: boolean, offerPerPage: number}>()

);

export const fetchMyOfferFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_MY_OFFER_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchMyOfferSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_MY_OFFER_SUCCESS,
    props<{
        responseData: any[];
        page:number;
        selectedOffers: any[];
    }>()
);

export const fetchDealDetails = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_DETAILS,
    props<{ dealRefId: string }>()
);

export const fetchDealDetailsFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchDealDetailsSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_DETAILS_SUCCESS,
    props<{
        responseData: DealDetailsFormat;
    }>()
);

export const fetchDealDetailsEmpty = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_DETAILS_EMPTY,
    props<{
        message: string;
    }>()
);

export const clearDealDetailsAuthError = createAction(
    DEAL_ACTION_TYPE.CLEAR_DEAL_DETAILS_AUTH_ERROR
);

export const fetchAllDealEmpty = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL_EMPTY
);

export const updateReceiverAllOffer = createAction(
    DEAL_ACTION_TYPE.UPDATE_RECEIVER_OFFER,
    props<{
        userData: any[];
    }>()
);

export const updateSenderAllOffer = createAction(
    DEAL_ACTION_TYPE.UPDATE_SENDER_OFFER,
    props<{
        userData: any[];
    }>()
);

export const updateDeliveryMode = createAction(
    DEAL_ACTION_TYPE.UPDATE_DELIVERY_MODE,
    props<{
        deliveryMode: string;
    }>()
);

export const updateDealComment = createAction(
    DEAL_ACTION_TYPE.UPDATE_DELIVERY_MODE,
    props<{
        dealComment: string;
    }>()
);

export const updateDealCurrentPage = createAction(
    DEAL_ACTION_TYPE.UPDATE_DEAL_CURRENT_PAGE,
    props<{
        currentPage: string;
    }>()
);

export const suggestDeal = createAction(
    DEAL_ACTION_TYPE.SUGGEST_DEAL,
    props<{
        initiateDealRequestObject: InitiateDealRequestObject;
    }>()
);

export const suggestDealSuccess = createAction(
    DEAL_ACTION_TYPE.SUGGEST_DEAL_SUCCESS,
    props<{
        response: any;
    }>()
);

export const suggestDealFailure = createAction(
    DEAL_ACTION_TYPE.SUGGEST_DEAL_FAILURE,
    props<{
        error: any;
    }>()
);

export const reviseDeal = createAction(
    DEAL_ACTION_TYPE.REVISE_DEAL,
    props<{
        initiateDealRequestObject: InitiateDealRequestObject;
    }>()
);

export const reviseDealSuccess = createAction(
    DEAL_ACTION_TYPE.REVISE_DEAL_SUCCESS,
    props<{
        response: any;
    }>()
);

export const reviseDealFailure = createAction(
    DEAL_ACTION_TYPE.REVISE_DEAL_FAILURE,
    props<{
        error: any;
    }>()
);

export const addDealInFavourite = createAction(
    DEAL_ACTION_TYPE.FAVOURITE_DEAL,
    props<{
        dealRefId: string;
    }>()
);

export const addDealInFavouriteSuccess = createAction(
    DEAL_ACTION_TYPE.FAVOURITE_DEAL_SUCCESS,
    props<{
        response: any;
    }>()
);
export const addDealInFavouriteFailure = createAction(
    DEAL_ACTION_TYPE.FAVOURITE_DEAL_FAILURE,
    props<{
        error: any;
    }>()
);

export const updateJunction = createAction(
    DEAL_ACTION_TYPE.UPDATE_JUNCTION_ID,
    props<{
        gintaaJunction: any;
    }>()
);

export const updateJunctionMeetingTime = createAction(
    DEAL_ACTION_TYPE.UPDATE_JUNCTION_MEETING_TIME,
    props<{
        meetingTime: any;
    }>()
);

export const updateJunctionMeetingDate = createAction(
    DEAL_ACTION_TYPE.UPDATE_JUNCTION_MEETING_DATE,
    props<{
        meetingDate: Date;
    }>()
);

export const fetchAllJunctions = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL_JUNCTIONS,
    props<{
        destinationOfferId:any,
        lat: any;
        lng: any;
    }>()
);

export const fetchAllJunctionsSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL_JUNCTIONS_SUCCESS,
    props<{
        response: any
    }>()
);

export const fetchAllJunctionsFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_ALL_JUNCTIONS_FAILURE,
    props<{
        error: any
    }>()
);

export const fetchDealDetailsFromFavourites = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_DETAILS_FROM_FAVOURITES,
    props<{
        dealRefId: string
    }>()
);

// MOCK API's
export const fetchDealDetailsMock = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_DETAILS_MOCK,
    props<{
        dealRefId: string
    }>()
);

export const fetchDealSnapshotMock = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_SNAPSHOT_MOCK,
    props<{
        dealRefId: string
    }>()
);

export const fetchDealSnapshotSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_SNAPSHOT_SUCCESS,
    props<{
        responseData: DealSnapshot[];
    }>()
);

export const closeModel = createAction(
    DEAL_ACTION_TYPE.DEAL_MODEL_CLOSE,
    props<{ modelType: any }>()
);

export const acceptDeal = createAction(
    DEAL_ACTION_TYPE.ACCEPT_DEAL,
    props<{
        dealRefId: string
    }>()
);
export const acceptDealDoorStep = createAction(
    DEAL_ACTION_TYPE.ACCEPT_DEAL_DOOR,
    props<{
        dealRefId: string,
        doorStepDeliveryInfo:any
    }>()
);

export const acceptDealSuccess = createAction(
    DEAL_ACTION_TYPE.ACCEPT_DEAL_SUCCESS,
    props<{
        response: any
    }>()
);

export const acceptDealFailure = createAction(
    DEAL_ACTION_TYPE.ACCEPT_DEAL_FAILURE,
    props<{
        error: any
    }>()
);


export const rejectDeal = createAction(
    DEAL_ACTION_TYPE.REJECT_DEAL,
    props<{
        dealRefId: string
    }>()
);

export const rejectDealSuccess = createAction(
    DEAL_ACTION_TYPE.REJECT_DEAL_SUCCESS,
    props<{
        response: any
    }>()
);

export const rejectDealFailure = createAction(
    DEAL_ACTION_TYPE.REJECT_DEAL_FAILURE,
    props<{
        error: any
    }>()
);

export const resendOtpStart = createAction(
    DEAL_ACTION_TYPE.RESEND_OTP,
    props<{
        dealRefId: string
    }>()
);

export const clearDealQuestion = createAction(
    DEAL_ACTION_TYPE.CLEAR_QUESTION,
);

export const resendOtpSuccess = createAction(
    DEAL_ACTION_TYPE.RESEND_OTP_SUCCESS,
    props<{
        response: any
    }>()
);

export const resendOtpFailure = createAction(
    DEAL_ACTION_TYPE.RESEND_OTP_FAILURE,
    props<{
        error: any
    }>()
);

export const closeDeal = createAction(
    DEAL_ACTION_TYPE.CLOSE_DEAL,
    props<{
        dealRefId: string,
        otp: string
    }>()
);

export const closeDealSuccess = createAction(
    DEAL_ACTION_TYPE.CLOSE_DEAL_SUCCESS,
    props<{
        response: any
    }>()
);

export const closeDealFailure = createAction(
    DEAL_ACTION_TYPE.CLOSE_DEAL_FAILURE,
    props<{
        error: any
    }>()
);

export const getRatingConfig = createAction(
    DEAL_ACTION_TYPE.GET_RATING_CONF_DEAL
);

export const getRatingConfigSuccess = createAction(
    DEAL_ACTION_TYPE.GET_RATING_CONF_DEAL_SUCCESS,
    props<{
        response: any
    }>()
);

export const getRatingConfigFailure = createAction(
    DEAL_ACTION_TYPE.GET_RATING_CONF_DEAL_FAILURE,
    props<{
        error: any
    }>()
);

export const getQuestionsForRatingContext = createAction(
    DEAL_ACTION_TYPE.GET_RATING_QUESTION_DEAL_CONTEXT,
    props<{
        contextId: string,
        newValue: number
    }>()
);

export const getQuestionsForRatingContextSuccess = createAction(
    DEAL_ACTION_TYPE.GET_RATING_QUESTION_DEAL_CONTEXT_SUCCESS,
    props<{
        response: any
    }>()
);

export const getQuestionsForRatingContextFailure = createAction(
    DEAL_ACTION_TYPE.GET_RATING_QUESTION_DEAL_CONTEXT_FAILURE,
    props<{
        error: any
    }>()
);

export const getQuestionsForRating = createAction(
    DEAL_ACTION_TYPE.GET_RATING_QUESTION_DEAL,
    props<{
        newValue: number
    }>()
);

export const getQuestionsForRatingSuccess = createAction(
    DEAL_ACTION_TYPE.GET_RATING_QUESTION_DEAL_SUCCESS,
    props<{
        response: any
    }>()
);

export const getQuestionsForRatingFailure = createAction(
    DEAL_ACTION_TYPE.GET_RATING_QUESTION_DEAL_FAILURE,
    props<{
        error: any
    }>()
);

export const saveDealUserRating = createAction(
    DEAL_ACTION_TYPE.SAVE_DEAL_USER_RATING,
    props<{
        requestData: any
    }>()
);

export const saveDealUserRatingSuccess = createAction(
    DEAL_ACTION_TYPE.SAVE_DEAL_USER_RATING_SUCCESS,
    props<{
        response: any
    }>()
);

export const saveDealGintaaRating = createAction(
    DEAL_ACTION_TYPE.SAVE_DEAL_GINTAA_RATING,
    props<{
        requestData: any
    }>()
);

export const saveDealGintaaRatingSuccess = createAction(
    DEAL_ACTION_TYPE.SAVE_DEAL_GINTAA_RATING_SUCCESS,
    props<{
        response: any
    }>()
);

export const saveDealUserRatingFailure = createAction(
    DEAL_ACTION_TYPE.SAVE_DEAL_USER_RATING_FAILURE,
    props<{
        error: any
    }>()
);

export const saveDealGintaaRatingFailure = createAction(
    DEAL_ACTION_TYPE.SAVE_DEAL_GINTAA_RATING_FAILURE,
    props<{
        error: any
    }>()
);

export const rateDeal = createAction(
    DEAL_ACTION_TYPE.RATE_DEAL,
);

export const closeDealStatus = createAction(
    DEAL_ACTION_TYPE.CLOSE_DEAL_STATUS,
);

export const fetchThirdPartyData = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_DATA,
);

export const fetchThirdPartyDataSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_DATA_SUCCESS,
    props<{
        response: any
    }>()
);

export const fetchThirdPartyDataFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_DATA_FAILURE,
    props<{
        error: any
    }>()
);

export const fetchThirdPartyDataShow = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_DATA_SHOW,
);

export const fetchThirdPartyDataShowSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_DATA_SHOW_SUCCESS,
    props<{
        response: any
    }>()
);

export const fetchThirdPartyDataShowFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_DATA_SHOW_FAILURE,
    props<{
        error: any
    }>()
);

export const updateThirdPartyOption = createAction(
    DEAL_ACTION_TYPE.UPDATE_THIRD_PARTY_OPTION,
    props<{
        thirdPartyOption: any
    }>()
);


export const getOfferByIds = createAction(
    DEAL_ACTION_TYPE.GET_OFFER_BY_IDS,
    props<{
        usertype: string,
        offerIds: any
    }>()
);

export const getOfferByReceiverIds = createAction(
    DEAL_ACTION_TYPE.GET_OFFER_BY_RECEIVER_IDS,
    props<{
        usertype: string,
        offerIds: any
    }>()
);

export const getOfferByIdsSuccessReceiver = createAction(
    DEAL_ACTION_TYPE.GET_OFFER_BY_IDS_SUCCESS_RECEIVER,
    props<{
        response: any;
        usertype: string;
    }>()
);

export const getOfferByIdsSuccessSender = createAction(
    DEAL_ACTION_TYPE.GET_OFFER_BY_IDS_SUCCESS_SENDER,
    props<{
        response: any;
        usertype: string;
    }>()
);

export const getOfferByIdsFailure = createAction(
    DEAL_ACTION_TYPE.GET_OFFER_BY_IDS_FAILURE,
    props<{
        error: any;
    }>()
);


export const fetchDealHistory = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_HISTORY,
    props<{
        dealRefId: string
    }>()
);

export const fetchDealHistorySuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_HISTORY_SUCCESS,
    props<{
        responseData: DealHistory;
    }>()
);

export const fetchDealHistoryFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_HISTORY_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchDealRating = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_RATING,
    props<{
        dealRefId: string;
        receiverIdentityId: string
        senderIdentityId: string
    }>()
);

export const fetchDealRatingSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_RATING_SUCCESS,
    props<{
        responseData: DealHistory;
    }>()
);

export const fetchDealRatingFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_DEAL_RATING_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchUserLocation = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_LOCATION,
    props<{
        offerId: string,
        currentLocation: any
    }>()
);

export const fetchUserLocationSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_LOCATION_SUCCESS,
    props<{
        responseData: DealHistory;
    }>()
);

export const fetchUserLocationFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_USER_LOCATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const getReceiverOfferByUserId = createAction(
    DEAL_ACTION_TYPE.GET_RECEIVER_OFFER_BY_IDS,
    props<{
        usertype: string,
        offerIds: any,
        userId: string,
        businessId: string,
    }>()
);

export const getReceiverOfferByIdSuccess = createAction(
    DEAL_ACTION_TYPE.GET_RECEIVER_OFFER_BY_IDS_SUCCESS,
    props<{
        responseData: any;
        selectedOffers: any;
    }>()
);

export const getReceiverOfferByIdFailure = createAction(
    DEAL_ACTION_TYPE.GET_RECEIVER_OFFER_BY_IDS_FAILURE,
    props<{
        error: any;
    }>()
);

export const getSenderOfferByUserId = createAction(
    DEAL_ACTION_TYPE.GET_SENDER_OFFER_BY_IDS,
    props<{
        usertype: string,
        offerIds: any,
        userId: string,
        businessId: string,
    }>()
);

export const getSenderOfferByIdSuccess = createAction(
    DEAL_ACTION_TYPE.GET_SENDER_OFFER_BY_IDS_SUCCESS,
    props<{
        responseData: any;
        selectedOffers: any;
    }>()
);

export const getSenderOfferByIdFailure = createAction(
    DEAL_ACTION_TYPE.GET_SENDER_OFFER_BY_IDS_FAILURE,
    props<{
        error: any;
    }>()
);


export const fetchThirdPartyVendor = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_VENDOR,
    props<{
        query: any
    }>()
);

export const fetchThirdPartyVendorSuccess = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_VENDOR_SUCCESS,
    props<{
        response: any
    }>()
);

export const fetchThirdPartyVendorFailure = createAction(
    DEAL_ACTION_TYPE.FETCH_THIRD_PARTY_VENDOR_FAILURE,
    props<{
        error: any
    }>()
);

export const getReceiverSiblingOffer = createAction(
    DEAL_ACTION_TYPE.GET_RECEIVER_SIBLING_OFFER,
    props<{
        usertype: string,
        offerIds: any,
        userId: string,
    }>()
);

export const getReceiverSiblingOfferSuccess = createAction(
    DEAL_ACTION_TYPE.GET_RECEIVER_SIBLING_OFFER_SUCCESS,
    props<{
        responseData: any;
        selectedOffers: any;
    }>()
);

export const getReceiverSiblingOfferFailure = createAction(
    DEAL_ACTION_TYPE.GET_RECEIVER_SIBLING_OFFER_FAILURE,
    props<{
        error: any;
    }>()
);

export const getSenderSiblingOffer = createAction(
    DEAL_ACTION_TYPE.GET_SENDER_SIBLING_OFFER,
    props<{
        usertype: string,
        offerIds: any,
        userId: string,
    }>()
);

export const getSenderSiblingOfferSuccess = createAction(
    DEAL_ACTION_TYPE.GET_SENDER_SIBLING_OFFER_SUCCESS,
    props<{
        responseData: any;
        selectedOffers: any;
    }>()
);

export const getSenderSiblingOfferFailure = createAction(
    DEAL_ACTION_TYPE.GET_SENDER_SIBLING_OFFER_FAILURE,
    props<{
        error: any;
    }>()
);
