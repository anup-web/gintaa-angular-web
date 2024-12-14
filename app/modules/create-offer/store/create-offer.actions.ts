import { AddressResponse } from '@gintaa/core/models/UserProfileResponse';

import { UploadResponse } from '@gintaa/shared/models/media';
import { Offer } from '@gintaa/shared/models/offer';
import { CurrentLocation } from '@gintaa/shared/models/shared.model';
import { createAction, props } from '@ngrx/store';
import { CREATE_OFFER_ACTION_TYPE } from '../configs/create-offer.config';
import { UserOfferInfo } from './models/user-offer-info';

export const uploadOfferImage = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_IMAGE_UPLOAD,
    props<{
        formData: FormData,
        url: string,
        mediaType: string
    }>()
);

export const uploadOfferVideo = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_VIDEO_UPLOAD,
    props<{
        formData: FormData,
        url: string,
        mediaType: string
    }>()
);

export const uploadOfferDocument = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_DOC_UPLOAD,
    props<{
        formData: FormData,
        url: string,
        mediaType: string
    }>()
);

export const updateDraftOfferDocument = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_DRAFT_OFFER_DOC_UPLOAD,
    props<{
        formData: FormData,
        url: string,
        mediaType: string
    }>()
);

export const updateDraftOfferImage = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_DRAFT_OFFER_IMAGE_UPLOAD,
    props<{
        formData: FormData,
        url: string,
        mediaType: string
    }>()
);

export const updateDraftOfferVideo = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_DRAFT_OFFER_VIDEO_UPLOAD,
    props<{
        formData: FormData,
        url: string,
        mediaType: string
    }>()
);

export const uploadOfferMediaSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPLOAD_SUCCESS,
    props<{
        response: UploadResponse[],
        mediaType: string
    }>()
);

export const updateOfferMediaSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPDATE_SUCCESS,
    props<{
        response: UploadResponse[],
        mediaType: string,
        actionType: string
    }>()
);

export const uploadOfferMediaProgress = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPLOAD_PROGRESS   
);

export const uploadOfferMediaFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_MEDIA_UPLOAD_FAILURE,
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
        url: string
    }>()
);

export const removePublishedOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_REMOVE_PUBLISHED_MEDIA,
    props<{
        id: string
        offerId: string
        mediaType: string
        url: string
    }>()
);

export const removeOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_REMOVE_MEDIA,
    props<{
        id: any;
        mediaType: string
    }>()
);

export const setOfferMedia = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_SET_COVER_MEDIA,
    props<{
        id: any;
        mediaType: string
    }>()
);



export const updateOfferLocation = createAction(
    CREATE_OFFER_ACTION_TYPE.UPDATE_CREATE_OFFER_LOCATION,
    props<{
        offer: UserOfferInfo,
        address: string
    }>()
);

export const addCreateOfferInfo = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_CREATE_OFFER_INFO,
    props<{
        offer: UserOfferInfo
    }>()
);

export const navigateOfferScreen = createAction(
    CREATE_OFFER_ACTION_TYPE.CREATE_OFFER_NAVIGATE_SCREEN,
    props<{
        offer: UserOfferInfo,
        currentScreen: string
    }>()
);

export const submitOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.SUBMIT_OFFER,
    props<{
        formValue: UserOfferInfo,
        url: string,
        isDraftOffer: string
    }>()
);

export const putOffer = createAction(
    CREATE_OFFER_ACTION_TYPE.PUT_OFFER,
    props<{
        formValue: UserOfferInfo,
        url: string
    }>()
);

export const offerPostsuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.SUBMIT_OFFER_SUCCESS,
    props<{
        response: Offer,
        currentScreen: string,
        redirect: boolean
    }>()
);

export const offerPostFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.SUBMIT_OFFER_FAILURE,
    props<{
        error: any,
        currentScreen: string
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
        allVericalCategories: any[],   
        currentScreen: string
    }>()
);

export const fetchOfferInitialDataFailure = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_INITIAL_DATA_FAILURE,
    props<{
        error: any;
    }>()
);

// export const fetchAddressData = createAction(
//     CREATE_OFFER_ACTION_TYPE.ADDRESS_FETCH,
//     props<{
//         id: string;
//     }>()
// );

// export const addressDataSuccess = createAction(
//     CREATE_OFFER_ACTION_TYPE.ADDRESS_DATA_SUCCESS,
//     props<{
//         id: string;
//         responseData: AddressResponse[];
//     }>()
// );

// export const addressDataFailure = createAction(
//     CREATE_OFFER_ACTION_TYPE.ADDRESS_DATA_FAILURE,
//     props<{
//         error: any;
//     }>()
// );

export const addUserAddress = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_USER_ADDRESS,
    props<{
        address: AddressResponse;
        offer: UserOfferInfo
    }>()
);

export const addUserAddressSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_USER_ADDRESS_SUCCESS,
    props<{
        address: any;
        offer: UserOfferInfo;
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

export const addSelectedCategory = createAction(
    CREATE_OFFER_ACTION_TYPE.ADD_SELECTED_CATEGORIES,
    props<{
        formValue: any
        category: any
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

export const fetchDraftData = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_DRAFT_DATA,
    props<{
        id: string
    }>()
);

export const offerDraftDataSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.OFFER_DRAFT_DATA_SUCCESS,
    props<{
        response: UserOfferInfo
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

export const removeDraftOfferSuccess = createAction(
    CREATE_OFFER_ACTION_TYPE.REMOVE_DRAFT_OFFER_SUCCESS,
    props<{
        currentScreen: string,
        redirect: boolean
    }>()
);

export const fetchPublishedData = createAction(
    CREATE_OFFER_ACTION_TYPE.FETCH_OFFER_PUBLISHED_DATA,
    props<{
        id: string
    }>()
);

