import { Action, createReducer, on } from '@ngrx/store';
import { BusinessState } from  '../models/BusinessState.model';
import { BusinessActions } from './action-types';

export const initialBusinessState: BusinessState = {
  loading: true,
  loadingMessage: null,
  successMessage: null,
  errorMessage: null,
  addEditAddressStatus: '',
  businessProfiles: null,
  businessInvitations: null,
  currentBusinessDetails: null,
  currentLocation: null,
  currentAdress: null,
  closeOpenedModel: false,
  currentBusinessMembers: [],
  currentBusinessOfers: [],
  refreshBusinessMembers: null,
  refreshBusinessInvitations: null,
  invitationAction: null,
  selectedBusinessMember: null,
  dealRatings: null,
  allBusinessRoles: [],
  removeMemberFromBusiness: false,
  currentBusinessSuggestedUrls: []
};

const _businessReducer = createReducer(

  initialBusinessState,

  on(
    BusinessActions.pageLoading,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  
  on(
    BusinessActions.pageLoaded,
    (state) => ({
      ...state,
      loading: false,
    })
  ),

  on(
    BusinessActions.clearSuccessMessgae,
    (state) => ({
      ...state,
      successMessage: null,
    })
  ),

  on(
    BusinessActions.fetchBusinessProfileSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      businessProfiles: action.businessFormData
    })
  ),

  on(
    BusinessActions.fetchBusinessProfileFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
      businessFormData: null
    })
  ),

  on(
    BusinessActions.fetchBusinessInvitationsSuccess,
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
    BusinessActions.fetchBusinessInvitationsFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
      businessFormData: null
    })
  ),

  on(
    BusinessActions.fetchBusinessDetailsSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'Business Details Fetched Successfully',
        errorMessage: null,
        currentBusinessDetails: {
          ...action.businessDetails,
        }
    })
  ),

  on(
    BusinessActions.fetchBusinessOffersSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'Business Offers Fetched Successfully',
        errorMessage: null,
        currentBusinessOfers: [
          ...action.offers
        ]
    })
  ),

  on(
    BusinessActions.fetchBusinessAllPublishedOffersSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'Business Offers Fetched Successfully',
        errorMessage: null,
        currentBusinessOfers: [
          ...action.offers
        ]
    })
  ),

  on(
    BusinessActions.fetchBusinessAllPublishedOffersFailure,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: 'Unable to fetch offers',
        currentBusinessOfers: []
    })
  ),

  on(
    BusinessActions.fetchBusinessOffersByIdentityIdSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'Business Offers Fetched Successfully',
        errorMessage: null,
        selectedBusinessMember: {
          ...state.selectedBusinessMember,
          offers: [
            ...action.offers
          ],
          refetchOffers: false,
        }
    })
  ),

  on(
    BusinessActions.fetchBusinessOffersByIdentityIdFailure,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: null,
        errorMessage: 'Unable to fetch offers',
        selectedBusinessMember: {
          ...state.selectedBusinessMember,
          offers: [],
          refetchOffers: false,
        }
    })
  ),

  on(
    BusinessActions.uploadBusinessLogoComplete,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'Business Cover Image Upload Successfully',
        errorMessage: null,
        currentBusinessDetails: {
          ...state.currentBusinessDetails,
          logoUrl: action.responseData.url
        }
    })
  ),

  on(
    BusinessActions.uploadBusinessCoverImageComplete,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: 'Business Cover Image Upload Successfully',
      errorMessage: null,
      currentBusinessDetails: {
        ...state.currentBusinessDetails,
        coverPhotoUrl: action.responseData.url
      }
    })
  ),

  on(
    BusinessActions.deleteBusinessLogoSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      currentBusinessDetails: {
        ...state.currentBusinessDetails,
        logoUrl: null,
      }
    })
  ),

  on(
    BusinessActions.deleteBusinessLogoFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
    })
  ),

  on(
    BusinessActions.updateBusinessColorSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      currentBusinessDetails: {
        ...state.currentBusinessDetails,
        brandColour: action.color,
      }
    })
  ),

  on(
    BusinessActions.updateBusinessColorFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
    })
  ),

  on(
    BusinessActions.updateCurrentLocation,
    (state, action) => ({
      ...state,
      currentLocation: action.location,
      errorMessage: null,
    })
  ),

  on(
    BusinessActions.updateCurrentLocationTitle,
    (state, action) => ({
      ...state,
      currentLocation: {
        ...state.currentLocation,
        title: action.addressTitle
      },
      errorMessage: null,
    })
  ),

  on(
    BusinessActions.updateAddressList,
    (state, action) => ({
      ...state,
      currentBusinessDetails: {
        ...state.currentBusinessDetails,
        address: [ ...action.address ]
      },
      errorMessage: null,
    })
  ),

  on(
    BusinessActions.updateBusinessAddress,
    (state, action) => ({
      ...state,
      currentAdress: action.address,
      errorMessage: null,
    })
  ),

  on(
    BusinessActions.addAddressSuccess,
    (state, action) => ({
      ...state,
      currentBusinessDetails: {
        ...state.currentBusinessDetails,
        businessAddresses: [
          ...state.currentBusinessDetails.businessAddresses,
          { ...action.address },
        ],
      },
      successMessage: 'Address Added Successfully',
      closeOpenedModel: true,
      errorMessage: null
    })
  ),
  
  on(
    BusinessActions.addAddressFailure,
    (state, action) => ({
      ...state,
      successMessage: null,
      closeOpenedModel:false,
      errorMessage: action.error
    })
  ),

  on(
    BusinessActions.editAddressSuccess,
    (state, action) => ({
      ...state,
      currentBusinessDetails: {
        ...state.currentBusinessDetails
      },
      successMessage: 'Business address updated successfully',
      closeOpenedModel: true,
      errorMessage: null
    })
  ),

  on(
    BusinessActions.resetModalFlag,
    (state) => ({
      ...state,
      loading: false,
      closeOpenedModel:false,
      currentLocation: null
    })
  ),

  on(
    BusinessActions.fetchBusinessMembersFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
      businessFormData: null,
      refreshBusinessMembers: null
    })
  ),

  on(
    BusinessActions.fetchBusinessMembersSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: 'Business Details Fetched Successfully',
        errorMessage: null,
        refreshBusinessMembers: null,
        currentBusinessMembers: action.members
    })
  ),

  on(
    BusinessActions.addBusinessMemberSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: action.message,
        errorMessage: null,
        refreshBusinessMembers: true,
        closeOpenedModel: true,
    })
  ),

  on(
      BusinessActions.addBusinessMemberFailure,
      (state, action) => ({
        ...state,
        loading: false,
        errorMessage: action.error,
        successMessage: null,
        businessFormData: null,
        refreshBusinessMembers: null,
        closeOpenedModel:false,
      })
    ),  

  on(
    BusinessActions.updateBusinessMemberFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
      businessFormData: null,
      refreshBusinessMembers: null
    })
  ),

  on(
    BusinessActions.updateBusinessMemberSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: action.message,
        errorMessage: null,
        refreshBusinessMembers: true,
        closeOpenedModel: true
    })
  ),

  on(
    BusinessActions.resendInvitationSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: action.message,
        errorMessage: null,
        refreshBusinessMembers: false,
        closeOpenedModel: true
    })
  ),

  on(
    BusinessActions.removeBusinessMemberFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: action.error,
      successMessage: null,
      businessFormData: null,
      refreshBusinessMembers: null
    })
  ),

  on(
    BusinessActions.removeBusinessMemberSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: action.message,
        errorMessage: null,
        removeMemberFromBusiness: true,
        closeOpenedModel: true
    })
  ),

  on(
    BusinessActions.removeInvitationSuccess,
    (state, action) => ({
        ...state,
        loading: false,
        successMessage: action.message,
        errorMessage: null,
        refreshBusinessMembers: true,
        closeOpenedModel: true,
        currentBusinessMembers: {
          Pending: state.currentBusinessMembers.Pending.filter((m) => m.id !== action.userId ),
          Accepted: state.currentBusinessMembers.Accepted,
          Rejected: state.currentBusinessMembers.Rejected.filter((m) => m.id !== action.userId ),
          Removed: state.currentBusinessMembers.Removed
        }
    })
  ),

  on(
    BusinessActions.fetchBusinessMemberDetailsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      refreshBusinessMembers: false,
      selectedBusinessMember: {
        ...action.member,
        offers: [],
        refetchOffers: true,
      }
    })
  ),


  on(
    BusinessActions.updateMemberActivationStatusSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      refreshBusinessMembers: true,
      closeOpenedModel: true,
    })
  ),
  
  on(
    BusinessActions.removeInvitationFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error,
      refreshBusinessMembers: false,
      closeOpenedModel: false,
    })
  ),


  on(
    BusinessActions.fetchDealCommentsSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      dealRatings: [
        ...action.ratings
      ]
    })
  ),

  on(
    BusinessActions.getAllBusinessRolesSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: action.message,
      errorMessage: null,
      allBusinessRoles: [
        ...action.roles
      ]
    })
  ),

  on(
    BusinessActions.acceptInvitationSuccess,
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
    BusinessActions.acceptInvitationFailure,
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
    BusinessActions.rejectInvitationSuccess,
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
    BusinessActions.rejectInvitationFailure,
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
    BusinessActions.fetchBusinessSuggestedUrlSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      errorMessage: null,
      currentBusinessSuggestedUrls: action.businessUrls,
    })
  ),

  on(
    BusinessActions.fetchBusinessSuggestedUrlFailure,
    (state, action) => ({
      ...state,
      loading: false,
      successMessage: null,
      errorMessage: action.error
    })
  ),

  on(
    BusinessActions.refetchBusinessOffer,
    (state, action) => ({
      ...state,
      selectedBusinessMember: {
        ...state.selectedBusinessMember,
        refetchOffers: true,
      },
      loading: true,
    })
  ),  

  on(
    BusinessActions.resetCloseOpenedPopupStatus,
    (state) => ({
      ...state,
      loading: false,
      closeOpenedModel:false
    })
  )

);

export function businessReducer(state: BusinessState, action: Action) {
  return _businessReducer(state, action);
}
