import localization from '@gintaa/config/localization';
import { Action, createReducer, on } from '@ngrx/store';
import { DealAvailableTabs, DealState } from  '../models/deal.model';
import { DealActions } from './action-types';

export const initialDealState: DealState = {
    loading: true,
    dealAddStatus: '',
    successMessage: null,
    errorMessage: null,
    dealDetailsAuthError: null,
    defaultOption: DealAvailableTabs.DEAL_ACCEPTED,
    currentOption: {
      type: ['ALL'],
      status: ['ALL']
    },
    maxWaitUntil: 10,
    navigateTodealList: false,
    closeStep:'',
    config: {
      accepted: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      incoming: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      outgoing: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      closed: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      rejected: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      revised: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      violated: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      partial_closed: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      abandoned: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      reported: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
      all: {
        lastFetchedOn: null,
        dirty: false,
        forceUpdate: false,
      },
    },
    myDeals: {
      accepted: [],
      incoming: [],
      outgoing: [],
      closed: [],
      rejected: [],
      violated: [],
      revised: [],
      partial_closed: [],
      abandoned: [],
      reported: [],
      all: []
    },
    initiateDeal: {
      receiverAllOffers: [],
      receiverSelectedOffers:[],
      senderAllOffers: [],
      senderSelectedOffers:[],
      senderProfileDetails:{
        name: '',
        profileImage: ''
      },
      receiverProfileDetails:{
        name: '',
        profileImage: ''
      },
      deliveryPreference: null,
      suggestMoney: {},
      requestMoney: {},
      comment: '',
      initiateDealRequest: null,
      currentPage: 'DEAL_INITIATE',
      junctionMeetingDate: null,
      gintaaJunction: null,
      junctionMeetingTime:null,
      allGintaaJunctions: [],
      addressList: [],
      addressFetched:false,
      userLocation:null,
      vendorList: [],
      packingList: [],
      insuranceVendorList: [],
      thirdPartyOption:{
        address: '',
        deliveryVendor: '',
        packingBox: '',
        weight: '',
        insurance: false,
        insuranceVendor:''
      }
    },
    lastFetchedDealDetails: null,
    lastFetchedDealHistory: null,
    lastFetchedDealSnapshot: null,
    lastFetchedDealThirdParty: null,
    lastFetchedDealRating: null,
    closeDealModelType: '',
    ratingQuestions: [],
    isRated: false,
    otpPayload: null
};

const _dealReducer = createReducer(

  initialDealState,

  on(
    DealActions.fetchAllDealEmpty,
    (state) => ({
      ...state,
      loading: false,
      errorMessage: localization.deal.NO_DEAL_FOUND,
      successMessage: null
    })
  ),
  on(
    DealActions.emptyInitiateData,
    (state) => ({
      ...state,
      initiateDeal: {
        receiverAllOffers: [],
        receiverSelectedOffers:[],
        senderAllOffers: [],
        senderSelectedOffers:[],
        senderProfileDetails:{
          name: '',
          profileImage: ''
        },
        receiverProfileDetails:{
          name: '',
          profileImage: ''
        },
        deliveryPreference: null,
        suggestMoney: {},
        requestMoney: {},
        comment: '',
        initiateDealRequest: null,
        currentPage: 'DEAL_INITIATE',
        junctionMeetingDate: null,
        gintaaJunction: null,
        junctionMeetingTime:null,
        allGintaaJunctions: [],
        addressList: [],
        addressFetched:false,
        userLocation:null,
        vendorList: [],
        packingList: [],
        insuranceVendorList: [],
        thirdPartyOption:{
          address: '',
          deliveryVendor: '',
          packingBox: '',
          weight: '',
          insurance: false,
          insuranceVendor:''
        }
      },
    })
  ),
  on(
    DealActions.acceptDealSuccess,
    (state) => ({
      ...state,
      currentOption:{
        type: ['ALL'],
        status: ['ACCEPTED']
      },
      navigateTodealList:true
    })
  ),
  on(
    DealActions.acceptDealFailure,
    (state, action) => ({
      ...state,
      loading:false,
      errorMessage: action.error
    })
  ),
  on(
    DealActions.rejectDealSuccess,
    (state) => ({
      ...state,
      errorMessage: null,
      currentOption:{
        type: ['ALL'],
        status: ['REJECTED']
      },
      successMessage: localization.deal.REJECTED_SUCCESS,
      navigateTodealList:true
    })
  ),
  on(
    DealActions.updateThirdPartyOption,
    (state, action) => ({
      ...state,
      initiateDeal: {
        ...state.initiateDeal,
        thirdPartyOption: action.thirdPartyOption
      }
    })
  ),
  on(
    DealActions.closeDealSuccess,
    (state, action) => ({
      ...state,
      loading:false,
      errorMessage:'',
      closeStep: action.response ?  action.response : 'PARTIAL_CLOSED'
    })
  ),
  on(
    DealActions.rateDeal,
    (state, action) => ({
      ...state,
      loading:false,
      errorMessage:'',
      successMessage:'',
      closeStep: 'RATE_USER'
    })
  ),
  on(
    DealActions.closeDealStatus,
    (state, action) => ({
      ...state,
      loading:false,
      errorMessage:'',
      successMessage:'',
      closeStep: ''
    })
  ),
  on(
    DealActions.closeDealFailure,
    (state, action) => ({
      ...state,
      successMessage:'',
      errorMessage: action.error ? (action.error?.message ? action.error?.message : (action.error?.payload ? (action.error?.payload[0]?.errorDetailedReason ? action.error?.payload[0]?.errorDetailedReason : 'Failed to validate otp') : 'Failed to validate otp')) : 'Failed to validate otp',
      loading:false
    })
  ),
  on(
    DealActions.resendOtpFailure,
    (state, action) => ({
      ...state,
      errorMessage:action.error,
      otpPayload:null,
      loading:false
    })
  ),
  
  on(
    DealActions.fetchAllDeal,
    (state, action) => ({
      ...state,
      loading: action.append ? false : true,
      dealAddStatus:'',
      lastFetchedDealDetails: null,
      lastFetchedDealHistory:null,
      lastFetchedDealSnapshot: null,
      lastFetchedDealThirdParty: null,
      navigateTodealList: false,
      closeStep:'',
      isRated: false,
    })
  ),
  on(
    DealActions.updateCurrentFetch,
    (state, action) => ({
      ...state,
      currentOption:action.dealType
    })
  ),
  on(
    DealActions.fetchUserOfferSuccess,
    (state, action) => ({          
      ...state,
      initiateDeal:{...state.initiateDeal, receiverSelectedOffers:action.selectedOffers, receiverAllOffers:action.responseData}
    })
  ),

  on(
    DealActions.fetchUserOfferFailure,
    (state, action) => ({          
      ...state,
      errorMessage: action.error
    })
  ),

  on(
    DealActions.fetchUserAllOfferSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal:{...state.initiateDeal, receiverSelectedOffers: [...state.initiateDeal.receiverSelectedOffers , ...action.selectedOffers], receiverAllOffers:[...state.initiateDeal.receiverAllOffers, ...action.responseData]}
    })
  ),
  on(
    DealActions.fetchMyOffer,
    (state, action) => ({          
      ...state,
      loading: true,
      initiateDeal:{...state.initiateDeal}
    })
  ),
  on(
    DealActions.fetchMyOfferSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal:{...state.initiateDeal, senderSelectedOffers: action.page == 0 ? [...action.selectedOffers] : [...state.initiateDeal.senderSelectedOffers , ...action.selectedOffers], senderAllOffers: action.page == 0 ? [...action.responseData] : [...state.initiateDeal.senderAllOffers , ...action.responseData]}
    })
  ),

  on(
    DealActions.getOfferByIdsSuccessReceiver,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal:{...state.initiateDeal, receiverAllOffers: [ ...action.response]}
    })
  ),

  on(
    DealActions.getOfferByIdsSuccessSender,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal:{...state.initiateDeal, senderAllOffers: [ ...action.response]}
    })
  ),

  on(
    DealActions.fetchAllDealSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: null,
      currentOption: action.currentFetch,
      myDeals: {
        ...state.myDeals,
        ['all']: action.append ? [...state.myDeals['all'], ...action.responseData] : action.responseData,
      }
    })
  ),

  on(
    DealActions.fetchAllDealFailure,
    (state, action) => ({
      ...state,
      myDeals: {
        ...state.myDeals,
        ['all']: action.append ? [...state.myDeals['all']] : [],
      },
      currentOption: action.currentFetch,
      loading: false,
      successMessage: null,
      errorMessage: action.error ? action.error?.message : 'Error fetching deals'
    })
  ),

  on(
    DealActions.pageLoading,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(
    DealActions.pageLoaded,
    (state) => ({
      ...state,
      loading: false,
    })
  ),

  on(
    DealActions.updateReceiverAllOffer,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal:{...state.initiateDeal, receiverSelectedOffers:action.userData}
    })
  ),

  on(
    DealActions.updateSenderAllOffer,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal:{...state.initiateDeal, senderSelectedOffers:action.userData}
    })
  ),

  on(
    DealActions.updateDeliveryMode,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        deliveryPreference: action.deliveryMode
      }
    })
  ),

  on(
    DealActions.updateDealComment,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        comment: action.dealComment
      }
    })
  ),

  on(
    DealActions.updateDealCurrentPage,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        currentPage: action.currentPage
      }
    })
  ),

  on(
    DealActions.suggestDealSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      dealAddStatus: action.response,
      lastFetchedDealHistory:null,
      lastFetchedDealDetails:action.response,
      successMessage: localization.deal.SUGGEST_DEAL_SUCCESS,
      errorMessage: null
    })
  ),

  on(
    DealActions.suggestDealFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error ? (action.error?.message ? action.error?.message : (action.error?.payload ? (action.error?.payload[0]?.errorDetailedReason ? action.error?.payload[0]?.errorDetailedReason : localization.deal.SUGGEST_DEAL_FAILED) : localization.deal.SUGGEST_DEAL_FAILED)) : localization.deal.SUGGEST_DEAL_FAILED
    })
  ),

  on(
    DealActions.addDealInFavouriteSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      dealAddStatus: action.response,
      successMessage: localization.deal.ADD_DEAL_FAVOURITE_SUCCESS,
      errorMessage: null
    })
  ),

  on(
    DealActions.addDealInFavouriteFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error ? (action.error?.message ? action.error?.message : (action.error?.payload ? (action.error?.payload[0]?.errorDetailedReason ? action.error?.payload[0]?.errorDetailedReason : localization.deal.ADD_DEAL_FAVOURITE_FAILED) : localization.deal.ADD_DEAL_FAVOURITE_FAILED)) : localization.deal.ADD_DEAL_FAVOURITE_FAILED
    })
  ),

  on(
    DealActions.reviseDealFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error ? (action.error?.message ? action.error?.message : (action.error?.payload ? (action.error?.payload[0]?.errorDetailedReason ? action.error?.payload[0]?.errorDetailedReason : localization.deal.REVISE_DEAL_FAILED) : localization.deal.REVISE_DEAL_FAILED)) : localization.deal.REVISE_DEAL_FAILED
    })
  ),
  on(
    DealActions.rejectDealFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error ? (action.error?.message ? action.error?.message : (action.error?.payload ? (action.error?.payload[0]?.errorDetailedReason ? action.error?.payload[0]?.errorDetailedReason : localization.deal.DEAL_REJECT_FAILED) : localization.deal.DEAL_REJECT_FAILED)) : localization.deal.DEAL_REJECT_FAILED
    })
  ),
  on(
    DealActions.fetchAllJunctions,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        allGintaaJunctions: []
      }
    })
  ),
  on(
    DealActions.fetchAllJunctionsSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        allGintaaJunctions: action.response
      }
    })
  ),
  on(
    DealActions.fetchAllJunctionsFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        allGintaaJunctions: []
      }
    })
  ),

  on(
    DealActions.updateJunction,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        gintaaJunction: action.gintaaJunction
      }
    })
  ),

  on(
    DealActions.updateJunctionMeetingTime,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        junctionMeetingTime: action.meetingTime
      }
    })
  ),

  on(
    DealActions.updateJunctionMeetingDate,
    (state, action) => ({          
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        junctionMeetingDate: action.meetingDate
      }
    })
  ),

  on(
    DealActions.clearDealQuestion,
    (state, action) => ({
      ...state,
      ratingQuestions: [],
    })
  ),

  on(
    DealActions.fetchDealDetailsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      dealAddStatus:'',
      dealDetailsAuthError: null,
      lastFetchedDealDetails: {
        ...action.responseData
      }
    })
  ),

  on(
    DealActions.fetchDealSnapshotSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: null,
      lastFetchedDealSnapshot: {
        ...action.responseData
      }
    })
  ),

  on(
    DealActions.fetchDealDetails,
    (state, action) => ({
      ...state,
      loading: true,
      dealDetailsAuthError: null,
      lastFetchedDealSnapshot: null,
      errorMessage: null
    })
  ),

  on(
    DealActions.fetchDealDetailsFailure,
    (state, action) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: null,
      lastFetchedDealSnapshot: null,
      errorMessage: action.error
    })
  ),

  on(
    DealActions.fetchDealHistorySuccess,
    (state, action) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: null,
     lastFetchedDealHistory: {
       ...action.responseData
     }
    })
  ),

  on(
    DealActions.fetchDealHistoryFailure,
    (state, action) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: null,
      lastFetchedDealHistory: null,
      errorMessage: action.error
    })
  ),

  on(
    DealActions.fetchDealDetailsEmpty,
    (state, action) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: action.message,
      errorMessage: null
    })
  ),

  on(
    DealActions.fetchDealDetailsFailure,
    (state, action) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: null,
      errorMessage: action.error
    })
  ),

  on(
    DealActions.fetchUserAddressSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      userAddress: action.responseData,
      initiateDeal: {
        ...state.initiateDeal, 
        addressList: action.responseData,
        addressFetched:true,
      },
      errorMessage: null
    })
  ),

  on(
    DealActions.fetchUserAddressFailure,
    (state, action) => ({
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        addressFetched:true,
      },
    })
  ),

  on(
    DealActions.fetchUserLocationSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        userLocation:action.responseData,
      },
    })
  ),

  on(
    DealActions.fetchUserLocationFailure,
    (state, action) => ({
      ...state,
      loading: false,
      initiateDeal: {
        ...state.initiateDeal,
        userLocation:null,
      },
    })
  ),

  on(
    DealActions.clearDealDetailsAuthError,
    (state) => ({
      ...state,
      loading: false,
      dealDetailsAuthError: null,
      errorMessage: null
    })
  ),

  on(
    DealActions.fetchDealSnapshotSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      lastFetchedDealSnapshot: {
        ...action.responseData
      }
    })
  ),

  on(
    DealActions.closeModel,
    (state, action) => ({          
      ...state,
      loading: false,
      closeDealModelType: action.modelType
    })
  ),
  on(
    DealActions.resendOtpStart,
    (state, action) => ({          
      ...state,
      loading: true,
      errorMessage:'',
      otpPayload: null,
      successMessage: null
    })
  ),
  on(
    DealActions.resendOtpSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage:'',
      otpPayload: action.response,
      successMessage: localization.deal.OTP_GENERATE_SUCCESS
    })
  ),
  on(
    DealActions.getQuestionsForRatingSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: '',
      ratingQuestions: action.response
    })
  ),
  on(
    DealActions.saveDealUserRatingFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage:action.error
    })
  ),
  on(
    DealActions.saveDealUserRatingSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: '',
      successMessage : 'User Rating Saved',
      // closeStep: 'GINTAA_USER',
      ratingQuestions: [],
      isRated: true,
      closeDealModelType: 'rating',
      // closeDealModelType: 'rating',
    })
  ),
  on(
    DealActions.saveDealGintaaRatingSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: '',
      successMessage : '',
      ratingQuestions: [],
      isRated: true,
      closeDealModelType: 'rating',
    })
  ),
  on(
    DealActions.fetchThirdPartyDataSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: '',
      initiateDeal: {
        ...state.initiateDeal,
        addressList: action.response.addressList ? action.response.addressList : [],
        packingList: action.response.packingList ? action.response.packingList : [],
        insuranceVendorList: action.response.insuranceVendorList ? action.response.insuranceVendorList : []
      }
    })
  ),
  on(
    DealActions.fetchThirdPartyDataFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage : '',
    })
  ),
  on(
    DealActions.fetchThirdPartyVendorSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: '',
      initiateDeal: {
        ...state.initiateDeal,
        vendorList: action.response,
      }
    })
  ),
  on(
    DealActions.fetchThirdPartyVendorFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage : '',
    })
  ),
  on(
    DealActions.fetchThirdPartyDataShowSuccess,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: '',
      lastFetchedDealThirdParty: action.response
    })
  ),
  on(
    DealActions.fetchThirdPartyDataShowFailure,
    (state, action) => ({          
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage : '',
    })
  ),
  on(
    DealActions.fetchDealRatingSuccess,
    (state, action) => ({          
      ...state,
      lastFetchedDealRating: action.responseData
    })
  ),

  on(
    DealActions.getReceiverOfferByIdSuccess,
    (state, action) => ({          
      ...state,
      initiateDeal:{...state.initiateDeal, receiverAllOffers:action.responseData, receiverSelectedOffers: action.selectedOffers}
    })
  ),

  on(
    DealActions.getReceiverOfferByIdFailure,
    (state, action) => ({          
      ...state,
      initiateDeal:{...state.initiateDeal, receiverAllOffers:null},
      errorMessage: action.error
    })
  ),

  on(
    DealActions.getSenderOfferByIdSuccess,
    (state, action) => ({          
      ...state,
      initiateDeal:{...state.initiateDeal, senderAllOffers:action.responseData, senderSelectedOffers: action.selectedOffers}
    })
  ),

  on(
    DealActions.getSenderOfferByIdFailure,
    (state, action) => ({          
      ...state,
      errorMessage: action.error,
      initiateDeal:{...state.initiateDeal, senderAllOffers:null},
    })
  ),
  
);

export function dealReducer(state: DealState, action: Action) {
  return _dealReducer(state, action);
}