import { AddressResponse } from '@gintaa/core/models/UserProfileResponse';
import { Country, Offer } from '@gintaa/shared/models/offer';
import { CurrentLocation } from '@gintaa/shared/models/shared.model';
import { createAction, props } from '@ngrx/store';
import { CREATE_OFFER_ACTION_TYPE } from '../create-offer.action.types';

export const updateDraftOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_DRAFT_OFFER_MEDIA,
    props<{
        response: Offer,
        formData: FormData,
        mediaType: string,
        viewType?: string;
    }>()
);

export const updatePublishedOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_PUBLISHED_OFFER_MEDIA,
    props<{
        response: Offer,
        formData: FormData,
        mediaType: string,
        viewType?: string,
        draftOfferId?: string
    }>()
);

export const updateOfferMediaSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPDATE_SUCCESS,
    props<{
        response: Offer,
        mediaType: string,
        actionType: string,
        viewType?: string,
        id?: string
    }>()
);

export const fetchSuggestedCategories = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_SUGGESTED_CATEGORY,
    props<{
        imageObjects: string[];
        offerType: string;
    }>()
);

export const suggestedTagsByUpdateMediaSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_SUGGESTED_CATEGORY_SUCCESS,
    props<{
        response: any[];
    }>()
);

export const uploadOfferMediaProgress = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPLOAD_PROGRESS
);

export const uploadOfferProgress = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_UPLOAD_PROGRESS
);

export const uploadOfferMediaFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPLOAD_FAILURE,
    props<{
        error: string;
    }>()
);

export const removeOfferMediaFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_DELETE_FAILURE,
    props<{
        error: string;
    }>()
);

export const removeDraftOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_REMOVE_DRAFT_MEDIA,
    props<{
        id: string
        offerId: string
        mediaType: string
        viewType: string
    }>()
);

export const removePublishedOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_REMOVE_PUBLISHED_MEDIA,
    props<{
        id: string
        offerId: string
        mediaType: string
        viewType: string
    }>()
);

export const updateOfferLocation = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_CREATE_OFFER_LOCATION,
    props<{
        offer: Offer,
        address: string
    }>()
);


export const navigateOfferScreen = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_NAVIGATE_SCREEN,
    props<{
        offer: Offer,
        currentScreen: string
    }>()
);

export const submitOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.SUBMIT_OFFER,
    props<{
        formValue: Offer
    }>()
);

export const updateOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_OFFER,
    props<{
        formValue: Offer,
        offerId: string
    }>()
);

export const putOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.PUT_OFFER,
    props<{
        formValue: Offer,
        url: string
    }>()
);

export const offerPostsuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.SUBMIT_OFFER_SUCCESS,
    props<{
        response: Offer,
        redirect: boolean
    }>()
);

export const offerPostFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.SUBMIT_OFFER_FAILURE,
    props<{
        error: any
    }>()
);

export const clearOfferData = createAction(
    CREATE_OFFER_ACTION_TYPE.CLEAR_OFFER_DATA
);

export const updateUserCurrentLocation = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_USER_LOCATION,
    props<{
        location: CurrentLocation;
    }>()
);

export const fetchOfferInitialData = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_INITIAL_DATA,
    props<{
        offerType: string
    }>()
);

export const fetchOfferInitialDataSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_INITIAL_DATA_SUCCESS,
    props<{
        userAllAddress: AddressResponse[],
        allVerticalCategories: any[],
        allCountryLists: Country[]
    }>()
);

export const fetchOfferInitialDataFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_INITIAL_DATA_FAILURE,
    props<{
        error: any;
    }>()
);

export const addUserAddress = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_USER_ADDRESS,
    props<{
        address: AddressResponse;
        offer: Offer
    }>()
);

export const addUserAddressSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_USER_ADDRESS_SUCCESS,
    props<{
        address: any;
        offer: Offer;
        message: string;
    }>()
);

export const addUserAddressFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_USER_ADDRESS_FAILURE,
    props<{
        error: any;
    }>()
);

export const resetAddressModelOpenState = createAction(
    CREATE_OFFER_ACTION_TYPE.RESET_ADDRESS_STATE,
    props<{
        closeOpenedModel: boolean;
    }>()
);

export const updateUserAddress = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_USER_ADDRESS,
    props<{
        address: AddressResponse;
    }>()
);

export const getAllTagsByCategoryId = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_SELECTED_TAGS_BY_CATEGORIES
);

export const updateTagsByCategoryIdSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_SELECTED_TAGS_BY_CATEGORIES_SUCCESS,
    props<{
        response: any[]
    }>()
);

export const selectedTagsByUserInfo = createAction(
    CREATE_OFFER_ACTION_TYPE.GET_SELECTED_TAGS_BY_USER_INFO,
    props<{
        reqBody: any
    }>()
);

export const selectedTagsByUserInfoSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.GET_SELECTED_TAGS_BY_USER_INFO_SUCCESS,
    props<{
        response: any[]
    }>()
);

export const addSelectedDesireCategory = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_SELECTED_DESIRE_CATEGORIES,
    props<{
        formValue: any
        category: any
    }>()
);

export const removeSelectedCategory = createAction(
    CREATE_OFFER_ACTION_TYPE.REMOVE_SELECTED_CATEGORIES
);

export const removeSelectedDesireCategory = createAction(
    CREATE_OFFER_ACTION_TYPE.REMOVE_SELECTED_DESIRE_CATEGORIES
);

export const clearFacets = createAction(
    CREATE_OFFER_ACTION_TYPE.REMOVE_SELECTED_DESIRE_CATEGORIES
);

export const createDraftOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_DRAFT_OFFER,
    props<{
        offerType: string,
        files: File[],
        mediaType: string,
        viewType: string
    }>()
);

export const updateDraftOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_DRAFT_OFFER,
    props<{
        offer: Offer,
        updateSingle?: string
    }>()
);

export const updateDraftOfferSingle = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_DRAFT_OFFER_SINGLE,
    props<{
        offer: Offer
    }>()
);

export const offerDraftDataLocalUpdate = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_DRAFT_OFFER_LOCAL,
    props<{
        key: string;
        value: any;
        formGroupName?: string;
    }>()
);

export const offerDraftDataLocalUpdateServiceTiming = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_DRAFT_OFFER_LOCAL_SERVICE_TIMING,
    props<{
        serviceTimingInfos: any[];
        serviceTimeSameForAllDays: boolean
    }>()
);

export const offerDraftServiceLocationLocalUpdate = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_DRAFT_SERVICE_LOCATION_OFFER_LOCAL,
    props<{
        myLocation: string;
        yourLocation: any;
    }>()
);

export const fetchDraftData = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_DRAFT_DATA,
    props<{
        id: string
    }>()
);

export const offerDraftDataSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.OFFER_DRAFT_DATA_SUCCESS,
    props<{
        response: Offer
    }>()
);

export const offerCategoryDataSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.OFFER_CATEGORY_DATA_SUCCESS,
    props<{
        response: Offer
    }>()
);

export const offerFacetDataSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.OFFER_FACET_DATA_SUCCESS,
    props<{
        response: Offer
    }>()
);

export const offerDesireDataSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.OFFER_DESIRE_DATA_SUCCESS,
    props<{
        response: Offer
    }>()
);

export const offerDraftDataFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.OFFER_DRAFT_DATA_FAILURE,
    props<{
        error: string;
    }>()
);


export const createOfferPostingLoader = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_POSTING_LOADER
);

export const removeDraftOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.REMOVE_DRAFT_OFFER,
    props<{
        id: string
    }>()
);

// export const removeDraftOfferSuccess = createAction(
//     CREATE_OFFER_ACTION_TYPE.REMOVE_DRAFT_OFFER_SUCCESS,
//     props<{
//         redirect: boolean
//     }>()
// );

export const removeDraftOfferSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.REMOVE_DRAFT_OFFER_SUCCESS
);

export const fetchPublishedData = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_PUBLISHED_DATA,
    props<{
        id: string
    }>()
);

export const createCloneOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_CLONE_DRAFT_OFFER,
    props<{
        response: Offer
    }>()
);

export const setAllTags = createAction(
    CREATE_OFFER_ACTION_TYPE.SET_TAGS_SELECTED_CATEGORY,
    props<{
        tags: any[]
    }>()
);

export const setSelectedFacets = createAction(
    CREATE_OFFER_ACTION_TYPE.SET_SELECTED_FACETS,
    props<{
        facets: any[],
        selectedTags?: any[]
    }>()
);

export const enableAccordionOne = createAction(
    CREATE_OFFER_ACTION_TYPE.ENABLE_ACCORDION_ONE
);

export const enableAccordionTwo = createAction(
    CREATE_OFFER_ACTION_TYPE.ENABLE_ACCORDION_TWO
);

export const disableAccordionTwo = createAction(
    CREATE_OFFER_ACTION_TYPE.DISABLE_ACCORDION_TWO
);

export const enableAccordionThree = createAction(
    CREATE_OFFER_ACTION_TYPE.ENABLE_ACCORDION_THREE
);

export const disableAccordionThree = createAction(
    CREATE_OFFER_ACTION_TYPE.DISABLE_ACCORDION_THREE
);

export const enablePostOfferSection = createAction(
    CREATE_OFFER_ACTION_TYPE.ENABLE_POST_OFFER_SECTION
);

export const disablePostOfferSection = createAction(
    CREATE_OFFER_ACTION_TYPE.DISABLE_POST_OFFER_SECTION
);

export const disableAccordionOne = createAction(
    CREATE_OFFER_ACTION_TYPE.DISABLE_ACCORDION_ONE
);

export const resetSectionToggles = createAction(
    CREATE_OFFER_ACTION_TYPE.RESET_SECTION_TOGGLES
);

export const enableDocumentsSection = createAction(
    CREATE_OFFER_ACTION_TYPE.ENABLE_DOCUMENTS_SECTION
);

export const disableDocumentsSection = createAction(
    CREATE_OFFER_ACTION_TYPE.DISABLE_DOCUMENTS_SECTION
);

export const disableOfferTab = createAction(
    CREATE_OFFER_ACTION_TYPE.DISABLE_OFFER_TAB,
    props<{
        name: string;
    }>()
);

export const enableOfferTab = createAction(
    CREATE_OFFER_ACTION_TYPE.ENABLE_OFFER_TAB,
    props<{
        name: string;
    }>()
);

export const resetOfferTabs = createAction(
    CREATE_OFFER_ACTION_TYPE.RESET_OFFER_TABS
);

export const updateCurrentActiveSection = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_CURRENT_ACTIVE_SECTION,
    props<{
        name: string;
    }>()
);

export const mediaUploadStart = createAction(
    CREATE_OFFER_ACTION_TYPE.MEDIA_UPLOAD_START,
);

export const mediaUploadComplete = createAction(
    CREATE_OFFER_ACTION_TYPE.MEDIA_UPLOAD_COMPLETE,
);

export const unsetOfferPostFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.UNSET_OFFER_POST_FAILURE,
);

export const unsetImageUploadFailed = createAction(
    CREATE_OFFER_ACTION_TYPE.UNSET_IMAGE_UPLOAD_FAILED,
);

export const fetchBusinessDetails = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_BUSINESS_DETAILS,
    props<{
        businessId: string;
    }>()
);

export const fetchBusinessDetailsSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_BUSINESS_DETAILS_SUCCESS,
    props<{
        message: string;
        businessDetails: any;
    }>()
);

export const fetchBusinessDetailsFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_BUSINESS_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);

export const updateCurrentLocationTitle = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_LOCATION_TITLE,
    props<{
        addressTitle: string;
    }>()
);

export const addBusinessUserAddress = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_BUSINESS_ADDRESS,
    props<{
        address: AddressResponse;
        businessId: string
    }>()
);

export const addBusinessUserSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_BUSINESS_ADDRESS_SUCCESS,
    props<{
        address: any;
        message: string;
    }>()
);

export const addBusinessUserFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_BUSINESS_ADDRESS_FAILURE,
    props<{
        error: any;
    }>()
);
