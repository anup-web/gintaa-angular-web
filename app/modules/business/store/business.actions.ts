import { AddressResponse } from '@gintaa/core/models';
import { CurrentLocation } from '@gintaa/shared/models/shared.model';
import { createAction, props } from '@ngrx/store';
import { BusinessDetails, BusinessRole, BusinessTeam } from '../models/BusinessState.model';
import { BUSINESS_ACTION_TYPE } from './business.action-types';

// general page loader helper
export const pageLoading = createAction(
    BUSINESS_ACTION_TYPE.PAGE_LOADING
);

export const pageLoaded = createAction(
    BUSINESS_ACTION_TYPE.PAGE_LOADED
);

export const clearSuccessMessgae = createAction(
    BUSINESS_ACTION_TYPE.CLEAR_SUCCESS_MSG
);

// BUSINESS RELATED ACTIONS
export const fetchBusinessProfile = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_PROFILE
);

export const fetchBusinessProfileSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_PROFILE_SUCCESS,
    props<{
        businessFormData: any;
        message: string;
        redirect: boolean;
    }>()
);

export const fetchBusinessProfileFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_PROFILE_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchBusinessInvitations = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_INVITATIONS
);

export const fetchBusinessInvitationsSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_INVITATIONS_SUCCESS,
    props<{
        businessInvitations: any;
        message: string;
    }>()
);

export const fetchBusinessInvitationsFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_INVITATIONS_FAILURE,
    props<{
        error: any;
    }>()
);

export const acceptInvitation = createAction(
    BUSINESS_ACTION_TYPE.ACCEPT_INVITATION,
    props<{
        businessId: string;
    }>()
);

export const acceptInvitationSuccess = createAction(
    BUSINESS_ACTION_TYPE.ACCEPT_INVITATION_SUCCESS
);

export const acceptInvitationFailure = createAction(
    BUSINESS_ACTION_TYPE.ACCEPT_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const rejectInvitationSuccess = createAction(
    BUSINESS_ACTION_TYPE.REJECT_INVITATION_SUCCESS
);

export const rejectInvitationFailure = createAction(
    BUSINESS_ACTION_TYPE.REJECT_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const rejectInvitation = createAction(
    BUSINESS_ACTION_TYPE.REJECT_INVITATION,
    props<{
        businessId: string;
        reason: string;
    }>()
);

export const activateBusinessProfile = createAction(
    BUSINESS_ACTION_TYPE.ACTIVATE_BUSINESS_PROFILE
);

export const deActivateBusinessProfile = createAction(
    BUSINESS_ACTION_TYPE.DEACTIVATE_BUSINESS_PROFILE
);

export const activateBusinessProfileSuccess = createAction(
    BUSINESS_ACTION_TYPE.ACTIVATE_BUSINESS_PROFILE_SUCCESS,
    props<{
        message: string;
    }>()
);

export const activateBusinessProfileFailure = createAction(
    BUSINESS_ACTION_TYPE.ACTIVATE_BUSINESS_PROFILE_FAILURE,
    props<{
        error: any;
    }>()
);

export const deActivateBusinessProfileSuccess = createAction(
    BUSINESS_ACTION_TYPE.DEACTIVATE_BUSINESS_PROFILE_SUCCESS,
    props<{
        message: string;
    }>()
);

export const deActivateBusinessProfileFailure = createAction(
    BUSINESS_ACTION_TYPE.DEACTIVATE_BUSINESS_PROFILE_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchBusinessDetails = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_DETAILS,
    props<{
        businessId: string;
    }>()
);

export const fetchBusinessDetailsBySlug = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_DETAILS_BY_SLUG,
    props<{
        businessSlug: string;
    }>()
);

export const fetchBusinessDetailsSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_DETAILS_SUCCESS,
    props<{
        message: string;
        businessDetails: BusinessDetails;
    }>()
);

export const fetchBusinessDetailsFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);

export const uploadBusinessCoverImage = createAction(
    BUSINESS_ACTION_TYPE.COVER_IMAGE_UPLOAD,
    props<{
        formData: FormData;
        businessId: string;
    }>()
);

export const uploadBusinessLogo = createAction(
    BUSINESS_ACTION_TYPE.LOGO_UPLOAD,
    props<{
        formData: FormData;
        businessId: string;
    }>()
);


export const uploadBusinessLogoComplete = createAction(
    BUSINESS_ACTION_TYPE.LOGO_UPLOAD_COMPLETE,
    props<{
        responseData: any;
        businessId: string;
    }>()
);

export const uploadBusinessCoverImageComplete = createAction(
    BUSINESS_ACTION_TYPE.COVER_IMAGE_UPLOAD_COMPLETE,
    props<{
        responseData: any;
        businessId: string;
    }>()
);

export const uploadBusinessCoverImageFailure = createAction(
    BUSINESS_ACTION_TYPE.COVER_IMAGE_UPLOAD_FAILURE,
    props<{
        error: any;
    }>()
);

export const deleteBusinessLogo = createAction(
    BUSINESS_ACTION_TYPE.LOGO_DELETE,
    props<{
        businessId: string;
    }>()
);

export const deleteBusinessLogoSuccess = createAction(
    BUSINESS_ACTION_TYPE.LOGO_DELETE_SUCCESS,
    props<{
        message: string;
    }>()
);

export const deleteBusinessLogoFailure = createAction(
    BUSINESS_ACTION_TYPE.LOGO_DELETE_FAILURE,
    props<{
        error: any;
    }>()
);

export const updateBusinessColor = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BRAND_COLOR,
    props<{
        businessId: string;
        color: string;
    }>()
);

export const updateBusinessColorSuccess = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BRAND_COLOR_SUCCESS,
    props<{
        message: string;
        color: string;
    }>()
);

export const updateBusinessColorFailure = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BRAND_COLOR_FAILURE,
    props<{
        error: any;
    }>()
);

export const addAddress = createAction(
    BUSINESS_ACTION_TYPE.ADD_ADDRESS,
    props<{
        address: AddressResponse;
        businessId: string
    }>()
);

export const addAddressSuccess = createAction(
    BUSINESS_ACTION_TYPE.ADD_ADDRESS_SUCCESS,
    props<{
        address: any;
        message: string;
    }>()
);

export const addAddressFailure = createAction(
    BUSINESS_ACTION_TYPE.ADD_ADDRESS_FAILURE,
    props<{
        error: any;
    }>()
);

export const editAddress = createAction(
    BUSINESS_ACTION_TYPE.EDIT_ADDRESS,
    props<{
        address: AddressResponse;
        addressId: string;
        businessId: string;
    }>()
);

export const editAddressSuccess = createAction(
    BUSINESS_ACTION_TYPE.EDIT_ADDRESS_SUCCESS,
    props<{
        address: any;
        message: string;
    }>()
);

export const editAddressFailure = createAction(
    BUSINESS_ACTION_TYPE.EDIT_ADDRESS_FAILURE,
    props<{
        error: any;
    }>()
);

export const updateAddressList = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_ADDRESS_LIST,
    props<{
        address: AddressResponse[];
    }>()
);


export const removeBusinessAddress = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_ADDRESS,
    props<{
        addressId: string;
        businessId: string;
    }>()
);


export const updateCurrentLocation = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_LOCATION,
    props<{
        location: CurrentLocation;
    }>()
);

export const updateCurrentLocationTitle = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_LOCATION_TITLE,
    props<{
        addressTitle: string;
    }>()
);

export const updateBusinessAddress = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_ADDRESS,
    props<{
        address: AddressResponse;
    }>()
);

export const resetModalFlag = createAction(
    BUSINESS_ACTION_TYPE.RESET_MODAL_FLAG
);

export const fetchBusinessMembers = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_MEMBERS,
    props<{
        businessId: string;
    }>()
);

export const fetchBusinessMembersSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_MEMBERS_SUCCESS,
    props<{
        message: string;
        members: any;
    }>()
);

export const fetchBusinessMembersFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_MEMBERS_FAILURE,
    props<{
        error: any;
    }>()
);

// UPDATE BUSINESS MEMBER DETAILS
export const updateBusinessMember = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BUSINESS_MEMBER,
    props<{
        businessId: string,
        memmberId: string,
        selectedRoleId: string
    }>()
);

export const updateBusinessMemberSuccess = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BUSINESS_MEMBER_SUCCESS,
    props<{
        userId: string;
        message: string;
    }>()
);

export const updateBusinessMemberFailure = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BUSINESS_MEMBER_FAILURE,
    props<{
        error: any;
    }>()
);

// REMOVE BUSINESS MEMBER
export const removeBusinessMember = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_BUSINESS_MEMBER,
    props<{
        member: BusinessTeam;
    }>()
);

export const removeBusinessMemberSuccess = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_BUSINESS_MEMBER_SUCCESS,
    props<{
        userId: string;
        message: string;
    }>()
);

export const removeBusinessMemberFailure = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_BUSINESS_MEMBER_FAILURE,
    props<{
        error: any;
    }>()
);

// INVITATION
export const resendInvitation = createAction(
    BUSINESS_ACTION_TYPE.RESEND_INVITATION,
    props<{
        userId: string;
        businessId: string;
        message: string;
    }>()
);

export const resendInvitationSuccess = createAction(
    BUSINESS_ACTION_TYPE.RESEND_INVITATION_SUCCESS,
    props<{
        userId: string;
        message: string;
    }>()
);

export const resendInvitationFailure = createAction(
    BUSINESS_ACTION_TYPE.RESEND_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const removeInvitation = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_INVITATION,
    props<{
        userId: string,
        businessId: string,
        invitationType: string
    }>()
);

export const removeInvitationSuccess = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_INVITATION_SUCCESS,
    props<{
        userId: string;
        message: string;
    }>()
);

export const removeInvitationFailure = createAction(
    BUSINESS_ACTION_TYPE.REMOVE_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);


// Update member activation
export const updateMemberActivationStatus = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_MEMBER_ACTIVATION_STATUS,
    props<{
        userId: string,
        businessId: string,
        activateStatus: boolean
    }>()
);

export const updateMemberActivationStatusSuccess = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_MEMBER_ACTIVATION_STATUS_SUCCESS,
    props<{
        userId: string;
        message: string;
    }>()
);

export const updateMemberActivationStatusFailure = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_MEMBER_ACTIVATION_STATUS_FAILURE,
    props<{
        error: any;
    }>()
);




// ADD BUSINESS MEMBER DETAILS
export const addBusinessMember = createAction(
    BUSINESS_ACTION_TYPE.ADD_BUSINESS_MEMBER,
    props<{
        members: any[],
        businessId: string
    }>()
);

export const addBusinessMemberSuccess = createAction(
    BUSINESS_ACTION_TYPE.ADD_BUSINESS_MEMBER_SUCCESS,
    props<{
        userId: string;
        message: string;
    }>()
);

export const addBusinessMemberFailure = createAction(
    BUSINESS_ACTION_TYPE.ADD_BUSINESS_MEMBER_FAILURE,
    props<{
        error: any;
    }>()
);

export const updateBusinessDetails = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BUSINESS_DETAILS,
    props<{
        businessForm: any;
        businessId: string;
    }>()
);

export const updateBusinessDetailsSuccess = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BUSINESS_DETAILS_SUCCESS,
    props<{
        message: string;
    }>()
);

export const updateBusinessDetailsFailure = createAction(
    BUSINESS_ACTION_TYPE.UPDATE_BUSINESS_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchBusinessMemberDetails = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_MEMBER_DETAILS,
    props<{
        businessId: string;
        memberId: string;
    }>()
);

export const fetchBusinessMemberDetailsSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_MEMBER_DETAILS_SUCCESS,
    props<{
        message: string;
        member: BusinessTeam;
    }>()
);

export const fetchBusinessMemberDetailsFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_MEMBER_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchBusinessOffers = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_OFFERS,
    props<{
        page: number;
    }>()
);

export const fetchBusinessOffersSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_OFFERS_SUCCESS,
    props<{
        message: string;
        offers: any[];
    }>()
);
    
export const fetchBusinessOffersFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_OFFERS_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchBusinessAllPublishedOffers = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_ALL_PUBLISHED_OFFERS,
    props<{
        businessId: string;
        showCompletedOffers: boolean;
    }>()
);

export const fetchBusinessAllPublishedOffersSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_ALL_PUBLISHED_OFFERS_SUCCESS,
    props<{
        message: string;
        offers: any[];
    }>()
);
    
export const fetchBusinessAllPublishedOffersFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_ALL_PUBLISHED_OFFERS_FAILURE,
    props<{
        error: any;
    }>()
);
        
export const fetchBusinessOffersByIdentityId = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_OFFERS_BY_IDENTITY_ID,
    props<{
        identityId: string;
        states: any; /** ACTIVE | DRAFT | ALL */
        showCompletedOffers: boolean;
    }>()
);

export const fetchBusinessOffersByIdentityIdSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_OFFERS_BY_IDENTITY_ID_SUCCESS,
    props<{
        message: string;
        offers: any[];
    }>()
);
    
export const fetchBusinessOffersByIdentityIdFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_OFFERS_BY_IDENTITY_ID_FAILURE,
    props<{
        error: any;
    }>()
);
        
export const fetchDealComments = createAction(
    BUSINESS_ACTION_TYPE.FETCH_DEAL_COMMENTS,
    props<{
        businessId: string;
    }>()
);

export const fetchDealCommentsSuccess = createAction(
    BUSINESS_ACTION_TYPE.FETCH_DEAL_COMMENTS_SUCCESS,
    props<{
        message: string;
        ratings: any[];
    }>()
);

export const fetchDealCommentsFailure = createAction(
    BUSINESS_ACTION_TYPE.FETCH_DEAL_COMMENTS_FAILURE,
    props<{
        error: any;
    }>()
);


export const getAllBusinessRoles = createAction(
    BUSINESS_ACTION_TYPE.GET_ALL_BUSINESS_ROLES,
    props<{
        businessId: string
    }>()
);

export const getAllBusinessRolesSuccess = createAction(
    BUSINESS_ACTION_TYPE.GET_ALL_BUSINESS_ROLES_SUCCESS,
    props<{
        message: string;
        roles: BusinessRole[]
    }>()
);


export const getAllBusinessRolesFailure = createAction(
    BUSINESS_ACTION_TYPE.GET_ALL_BUSINESS_ROLES_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchBusinessSuggestedUrl = createAction(
    BUSINESS_ACTION_TYPE.FETCH_BUSINESS_SUGGESTED_URL,
    props<{
        businessName: string;
    }>()
);

export const fetchBusinessSuggestedUrlSuccess = createAction(
    BUSINESS_ACTION_TYPE.RESEND_INVITATION_SUCCESS,
    props<{
        businessUrls: string[];
        message: string;
    }>()
);

export const fetchBusinessSuggestedUrlFailure = createAction(
    BUSINESS_ACTION_TYPE.RESEND_INVITATION_FAILURE,
    props<{
        error: any;
    }>()
);

export const refetchBusinessOffer = createAction(
    BUSINESS_ACTION_TYPE.REFETCH_BUSINESS_OFFER
);

export const resetCloseOpenedPopupStatus = createAction(
    BUSINESS_ACTION_TYPE.RESET_CLOSE_OPENED_POPUP_STATUS
);
