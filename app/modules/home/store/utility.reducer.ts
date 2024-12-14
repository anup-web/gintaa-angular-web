import { Action, createReducer, on } from '@ngrx/store';
import { UtilityState } from  '../models/UtilityState.model';
import { UtilityActions } from './action-types';

export const initialUtilityState: UtilityState = {
  loading: true,
  loadingMessage: null,
  successMessage: null,
  errorMessage: null,
  action: null,
  businessFormData: null,
  businessCreated: null,
  businessCreationError: null,
  refetchBusinessPofiles: true,
  businessProfiles: [],
  businessFetchSuccess: null,
  lastBusinessCreatedId: null,
  currentOfferFavouriteCount: null,  
  offerAddedToFavoriteId: null,
  offerRemovedId: null,
  matchBoxLoaded: false,
  offersMatchBox: [],
  currentBusinessActiveMembers: [],
  offerDelegateStatus: false,
  latestDraftOffer: [],
  businessInvitations: null,
  refreshBusinessInvitations: false,
  invitationAction: null,
  currentOfferActivityCounts: null,
  closeOpenedPopup: false,
  receivedAccountDetailsList: [],
  receivedAccountDetailsListBusiness: [],
  businessMigrateData: null
};

const _utilityReducer = createReducer(

  initialUtilityState,

  on(
    UtilityActions.pageLoading,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(
    UtilityActions.pageLoaded,
    (state) => ({
      ...state,
      loading: false,
    })
  ),

  on(
    UtilityActions.setErrorMessage,
    (state, action) => ({
      ...state,
      errorMessage: action.message,
    })
  ),

  on(
    UtilityActions.setBusinessErrorMessage,
    (state, action) => ({
      ...state,
      businessCreationError: action.message,
    })
  ),

  on(
    UtilityActions.unsetErrorMessage,
    (state) => ({
      ...state,
      errorMessage: null,
    })
  ),

  on(
    UtilityActions.unsetBusinessErrorMessage,
    (state) => ({
      ...state,
      businessCreationError: null,
    })
  ),

  on(
    UtilityActions.setSuccessMessage,
    (state, action) => ({
      ...state,
      successMessage: action.message,
    })
  ),

  on(
    UtilityActions.unsetSuccessMessage,
    (state) => ({
      ...state,
      successMessage: null,
    })
  ),

  on(
    UtilityActions.clearMessages,
    (state) => ({
      ...state,
      successMessage: null,
      errorMessage: null,
    })
  ),

  on(
    UtilityActions.clearLastSavedFavoriteOfferId,
    (state) => ({
      ...state,
      offerAddedToFavoriteId: null,
    })
  ),

  on(
    UtilityActions.clearLastRemovedFavoriteOfferId,
    (state) => ({
      ...state,
      offerRemovedId: null,
    })
  ),

  on(
    UtilityActions.createBusinessProfileSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      action: 'BUSINESS',
      businessCreated: true,
      lastBusinessCreatedId: action.businessFormData.id,
      businessFormData: {
        ...action.businessFormData
      },
      refetchBusinessPofiles: true,
    })
  ),

  on(
    UtilityActions.createBusinessProfileFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      businessFormData: null,
      action: 'BUSINESS',
      businessCreated: false,
      businessCreationError: action.error
    })
  ),

  on(
    UtilityActions.creatBusinessProfileReset,
    (state, action) => ({
      ...state,
      businessCreated: null
    })
  ),

  on(
    UtilityActions.clearBusinessProfile,
    (state, action) => ({
      ...state,
      action: 'BUSINESS',
      businessProfiles: [],
      refetchBusinessPofiles: false
    })
  ),

  on(
    UtilityActions.fetchBusinessProfileSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      action: 'BUSINESS',
      businessProfiles: [ ...state.businessProfiles, ...action.businessFormData ],
      businessFetchSuccess: true,
      refetchBusinessPofiles: false,
    })
  ),

  on(
    UtilityActions.fetchBusinessProfileEmpty,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      action: 'BUSINESS',
      businessFetchSuccess: true,
      refetchBusinessPofiles: false,
    })
  ),

  // on(
  //   UtilityActions.fetchBusinessProfileFailure,
  //   (state, action) => ({
  //     ...state,
  //     loading: false,
  //     errorMessage: null,
  //     action: 'BUSINESS',
  //     successMessage: null,
  //     // businessFormData: null,
  //     refetchBusinessPofiles: false,
  //     businessFetchSuccess: false,
  //   })
  // ),

  on(
    UtilityActions.fetchMemberBusinessProfilesSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      action: 'BUSINESS',
      businessProfiles: [ ...state.businessProfiles, ...action.businessData ],
      businessFetchSuccess: true,
      refetchBusinessPofiles: false,
    })
  ),

  on(
    UtilityActions.fetchMemberBusinessProfilesEmpty,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      action: 'BUSINESS',
      businessFetchSuccess: true,
      refetchBusinessPofiles: false,
    })
  ),

  on(
    UtilityActions.fetchBusinessProfileFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      action: 'BUSINESS',
      successMessage: null,
      // businessFormData: null,
      refetchBusinessPofiles: false,
      businessFetchSuccess: false,
    })
  ),

  on(
    UtilityActions.reFetchBusinessProfile,
    (state) => ({
      ...state,
      loading: false,
      refetchBusinessPofiles: true,
    })
  ),

  on(
    UtilityActions.addRemoveOfferToFavouriteSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: null,
      successMessage: 'Offer added to favorite successfully',
      offerAddedToFavoriteId: action.offerId,
      offerRemovedId: null,
      action: 'OFFER-CARD_DEFAULT',
    })
  ),

  on(
    UtilityActions.addRemoveOfferToFavouriteFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: `Failed to add offer into favorite: ${action.message}`,
      successMessage: null,
      offerRemovedId: null,
      offerAddedToFavoriteId: null,
      action: 'OFFER-CARD_DEFAULT',
    })
  ),

  on(
    UtilityActions.removeOfferFromFavouriteSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: null,
      successMessage: 'Offer removed from favorite successfully',
      offerAddedToFavoriteId: null,
      offerRemovedId: action.offerId,
      action: 'OFFER-CARD_DEFAULT',
    })
  ),

  on(
    UtilityActions.removeOfferFromFavouriteFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: `Failed to remove offer from favorite: ${action.message}`,
      offerAddedToFavoriteId: null,
      offerRemovedId: null,
      action: 'OFFER-CARD_DEFAULT',
    })
  ),

  on(
    UtilityActions.getFavouriteOfferCountSuccess,
    (state, action) => ({
      ...state,
      errorMessage: null,
      successMessage: '',
      currentOfferFavouriteCount: action.response.favouriteCount,
      currentOfferActivityCounts: action.response
    })
  ),

  on(
    UtilityActions.getFavouriteOfferCountFailure,
    (state, action) => ({
      ...state,
      errorMessage: null, // `Cannot get favourite offer count. ${action.message}`,
      successMessage: null
    })
  ),

  on(
    UtilityActions.getOffersMatchBoxSuccess,
    (state, action) => ({
      ...state,
      matchBoxLoaded: true,
      offersMatchBox: action.response
    })
  ),

  on(
    UtilityActions.getOffersMatchBoxFailure,
    (state, action) => ({
      ...state,
     matchBoxLoaded: true
    })
  ),

  on(
    UtilityActions.fetchLatestDraftOfferSuccess,
    (state, action) => ({
      ...state,
      latestDraftOffer: action.response
    })
  ),

  on(
    UtilityActions.fetchLatestDraftOfferFailure,
    (state, action) => ({
      ...state
    })
  ),

  on(
    UtilityActions.clearLatestDraftOffer,
    (state, action) => ({
      ...state,
      latestDraftOffer: []
    })
  ),

  on(
    UtilityActions.getCurrentBusinessActiveMembersSuccess,
    (state, action) => ({
      ...state,
      currentBusinessActiveMembers: action.response,
      errorMessage: null,
      successMessage: null,
      offerDelegateStatus: false
    })
  ),

  on(
    UtilityActions.getCurrentBusinessActiveMembersFailure,
    (state, action) => ({
      ...state,
      errorMessage: action.message
    })
  ),

  on(
    UtilityActions.delegateBusinessOfferSuccess,
    (state, action) => ({
      ...state,
      errorMessage: null,
      successMessage: action.message,
      offerDelegateStatus: true
    })
  ),

  on(
    UtilityActions.delegateBusinessOfferFailure,
    (state, action) => ({
      ...state,
      errorMessage: action.message,
      successMessage: null,
      offerDelegateStatus: false
    })
  ),

  on(
    UtilityActions.changeOfferDelegationStatusFalse,
    (state, action) => ({
      ...state,
      offerDelegateStatus: action.status
    })
  ),
  on(
    UtilityActions.clearOffersMatchBox,
    (state, action) => ({
      ...state,
      matchBoxLoaded: false,
      offersMatchBox: []
    })
  ),

  

  on(
    UtilityActions.fetchBusinessInvitationsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      businessInvitations: action.businessInvitations,
      refreshBusinessInvitations: null,
    })
  ),

  on(
    UtilityActions.fetchBusinessInvitationsFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
      businessFormData: null
    })
  ),
  

  on(
    UtilityActions.acceptInvitationSuccess,
    (state) => ({
      ...state,
      loading: false,
      invitationAction: 'INVITATION_ACCEPT',
      successMessage: 'Invitation Accepted',
      errorMessage: null,
      refreshBusinessInvitations: true,
    })
  ),

  on(
    UtilityActions.acceptInvitationFailure,
    (state) => ({
      ...state,
      loading: false,
      successMessage: null,
      invitationAction: 'INVITATION_ACCEPT',
      errorMessage: 'Unable to accept invitation',
      refreshBusinessInvitations: false,
    })
  ),

  on(
    UtilityActions.rejectInvitationSuccess,
    (state) => ({
      ...state,
      loading: false,
      invitationAction: 'INVITATION_REJECT',
      successMessage: 'Invitation Rejected',
      errorMessage: null,
      refreshBusinessInvitations: true,
    })
  ),

  on(
    UtilityActions.rejectInvitationFailure,
    (state) => ({
      ...state,
      loading: false,
      successMessage: null,
      invitationAction: 'INVITATION_REJECT',
      errorMessage: 'Unable to reject invitation',
      refreshBusinessInvitations: false,
    })
  ),

  on(
    UtilityActions.addReceivePaymentDetailsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      closeOpenedPopup: true,
    })
  ),

  on(
    UtilityActions.addReceivePaymentDetailsFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error
    })
  ),

  on(
    UtilityActions.updateReceivePaymentDetailsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      closeOpenedPopup: true,
    })
  ),

  on(
    UtilityActions.updateReceivePaymentDetailsFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error
    })
  ),

  on(
    UtilityActions.closeOpenedPopupReset,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: null,
      closeOpenedPopup: false,
    })
  ),

  on(
    UtilityActions.getAllReceivePaymentListSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      closeOpenedPopup: false,
      receivedAccountDetailsList: action.accountList
    })
  ),

  on(
    UtilityActions.getAllReceivePaymentListFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error,
      closeOpenedPopup: false,
      receivedAccountDetailsList: []
    })
  ),

  on(
    UtilityActions.getAllReceivePaymentListForBusinessSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      closeOpenedPopup: false,
      receivedAccountDetailsListBusiness: action.accountList
    })
  ),

  on(
    UtilityActions.getAllReceivePaymentListForBusinessFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error,
      closeOpenedPopup: false,
      receivedAccountDetailsListBusiness: []
    })
  ),


  on(
    UtilityActions.deleteReceivePaymentAccountSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      closeOpenedPopup: true
    })
  ),

  on(
    UtilityActions.deleteReceivePaymentAccountFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error,
      closeOpenedPopup: false
    })
  ),



  on(
    UtilityActions.getMigrationDataForBusinessSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      businessMigrateData: action.migrationData
    })
  ),

  on(
    UtilityActions.getMigrationDataForBusinessFailure,
    (state, action) => ({
      ...state,
      loading: false,
      businessMigrateData: null
    })
  ),

  on(
    UtilityActions.resetMigreatDataFromStore,
    (state, action) => ({
      ...state,
      loading: false,
      businessMigrateData: null
    })
  ),

);

export function utilityReducer(state: UtilityState, action: Action) {
  return _utilityReducer(state, action);
}
